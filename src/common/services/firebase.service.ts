import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CreateUserDTO } from 'src/auth/dto/createUser.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';

interface IBase {
  collection: string;
}

interface IInsert extends IBase {
  data: any;
}

interface IUpdate extends IBase {
  doc: string;
  data: any;
}

interface IFindDoc extends IBase {
  doc: string;
}

export class Firebase {
  constructor() {
    if (firebase.apps.length === 0) {
      const firebaseConfig = {
        apiKey: 'AIzaSyDLM3djS5f5qfDLO2PEXFNtO85jFdHwA8I',
        authDomain: 'food-service-dac14.firebaseapp.com',
        projectId: 'food-service-dac14',
        storageBucket: 'food-service-dac14.appspot.com',
        messagingSenderId: '1073168457729',
        appId: '1:1073168457729:web:71190b333e210e52a46000',
        measurementId: 'G-ME0T3PHKJM',
      };
      firebase.initializeApp(firebaseConfig);
    }
  }

  async registerUser({
    email,
    password,
    name,
    company,
    isCompanyAccount,
  }: CreateUserDTO): Promise<IUser> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (u) => {
        const { uid, email } = u.user;
        const db = firebase.firestore();
        const data = {
          name,
          email,
          uid,
          company,
          isCompanyAccount,
          lastLogin: new Date().toISOString(),
          token: await u.user.getIdToken(),
        };
        db.collection('users')
          .doc(uid)
          .set(data)
          .then(() => 'success')
          .catch((e) => {
            throw new BadRequestException(e);
          });
        return data;
      })
      .catch((e) => {
        throw new BadRequestException(e);
      });
  }
  async login({ email, password }: LoginDTO): Promise<IUser> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        return this.update({
          collection: 'users',
          doc: user.uid,
          data: {
            lastLogin: new Date().toISOString(),
            token: await user.getIdToken(true),
          },
        });
      })
      .catch((e) => {
        throw new UnauthorizedException(e);
      });
  }

  async insert({ collection, data }: IInsert): Promise<any> {
    const db = firebase.firestore();
    return db
      .collection(collection)
      .add(data)
      .then((docRef) => docRef)
      .catch((e) => {
        throw new BadRequestException(e);
      });
  }

  async update({ collection, doc, data }: IUpdate): Promise<any> {
    const db = firebase.firestore();
    return db
      .collection(collection)
      .doc(doc)
      .update(data)
      .then(() => this.findDoc({ collection, doc }))
      .catch((e) => {
        throw new BadRequestException(e);
      });
  }

  async findDoc({ collection, doc }: IFindDoc): Promise<any> {
    const db = firebase.firestore();
    db.collection(collection)
      .doc(doc)
      .get()
      .then((doc) => doc.data())
      .catch((e) => {
        throw new BadRequestException(e);
      });
  }
}
