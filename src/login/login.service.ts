import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";
import { AuthService } from "../auth/auth.service";
import { EncryptService } from 'src/encrypt/encrypt.service';

@Injectable()
export class LoginService {

	constructor(
		@InjectModel("User") private readonly userModel: Model<User>,
		private readonly authService: AuthService,
		private readonly encryptService: EncryptService
		) {
	}

	async validateLogin(Body) {
		const { username, password } = Body;
		const user = await this.findUser(username);
		// 用户存在且密码正确
		const isAuthedUser = this.encryptService.validate(password, user.password);
		if ( user && isAuthedUser) {
			const token = this.authService.createJWT(username);
			return {
				user: username,
				token: token
			};
		} else {
			throw new HttpException({
				status: HttpStatus.FORBIDDEN,
				error: "账户密码不正确，请重新输入！"
			}, 403);
		}
	}

	// query in mongodb
	private async findUser(username: string): Promise<User>{
		return this.userModel.findOne({ 
			username: username 
		}, 
		{ 
			username : 1,
			password: 1,
			_id: 0
		}).exec();
	}

}
