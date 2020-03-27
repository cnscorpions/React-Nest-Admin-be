import { Document } from "mongoose";

export interface User extends Document {
	readonly username: string;
					 password: string;
	readonly roles: string[];
	readonly isEnabled: boolean;
}