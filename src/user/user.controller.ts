import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('login')
export class UserController {

	constructor(private userService: UserService) {

	}

	@Post()
	async login(@Body() Body) {
		const data = await this.userService.validateLogin(Body);
		return data;
	}
}
