import { IsString } from "class-validator";

export class ResetPwdDto {

	@IsString()
	readonly username: string;

	@IsString()
	readonly oldPwd: string;

	@IsString()
	readonly newPwd: string;

}
