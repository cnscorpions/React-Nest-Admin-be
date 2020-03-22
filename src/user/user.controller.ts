import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

	constructor(private userService: UserService) {

	}

	// 登录
	@Post('login')
	async login(@Body() Body) {
		const data = await this.userService.validateLogin(Body);
		return data;
	}

	// 注册
	@Post('signup')
	async signup(@Body() Body) {
		const data = await this.userService.createUer(Body);
		return data;
	}
}
