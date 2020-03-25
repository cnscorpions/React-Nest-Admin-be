import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const rolesFromBe = this.reflector.get<string[]>("roles", context.getHandler());
		// 当不存在角色列表的情况下，直接通过
		if (!rolesFromBe) {
			return true;
		}

		// 拿到request对象
		const request = context.switchToHttp().getRequest();
		// 从请求头拿到roles
		const rolesFromFe = request.headers.roles;
		// role匹配
    return rolesFromBe.includes(rolesFromFe);
	}

}
