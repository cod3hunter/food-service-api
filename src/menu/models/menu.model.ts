import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Menu {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
