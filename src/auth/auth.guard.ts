import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private readonly authService: AuthService) {

	}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		return this.validateRequest(request);
	}

	private validateRequest(req): boolean {
		const result = this.authService.extractJWTAndVerify(req) ? true : false;
		return result;
	}
}
