import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MenusModule } from './menu/menu.module';

@Module({
  imports: [
    MenusModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
