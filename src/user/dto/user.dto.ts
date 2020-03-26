import { IsString, IsArray, IsBoolean } from "class-validator";

export class UserDto {

	@IsString()
	readonly username: string;

	@IsString()
	readonly password: string;

	@IsArray()
	readonly roles: string[];

	@IsBoolean()
	readonly isEnabled: boolean;

}
