import { Controller, Get, Headers, UseGuards} from '@nestjs/common';
import { ProfileService } from "./profile.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('profile')
export class ProfileController {

	constructor() {}

	@Get()
	@UseGuards(AuthGuard)
	getProfile(@Headers("authorization") token) {
		return "can activate";
	}
}
