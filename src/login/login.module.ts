import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthService } from "../auth/auth.service";
import { EncryptService } from "../encrypt/encrypt.service";
import { UserSchema } from "./schemas/user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
	],
  controllers: [LoginController],
  providers: [LoginService, AuthService, EncryptService]
})
export class LoginModule {}
