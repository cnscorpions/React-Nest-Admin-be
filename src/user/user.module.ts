import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from "../auth/auth.service";
import { EncryptService } from "../encrypt/encrypt.service";
import { UserSchema } from "./schemas/user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
	],
  controllers: [UserController],
  providers: [UserService, AuthService, EncryptService]
})
export class UserModule {}
