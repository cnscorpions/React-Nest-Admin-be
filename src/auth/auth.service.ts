import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { PRIVATE_KEY, JWT_EXPIRED } from "../utils/constant";

@Injectable()
export class AuthService {

	// generate jwt
	createJWT(username) {
		const token = jwt.sign(
			{ username },
			PRIVATE_KEY,
			{ expiresIn: JWT_EXPIRED }
		);
		return token;
	}

	// extract token
	extractJWTAndVerify(req) {
		const token = req.headers.authorization;
		try {
			const decode = this.verifyJWT(token);
			return decode;
		} catch(e) {
			return false;
		}
	}

	// verify jwt
	private verifyJWT(token) {
		if (token) {
			const decoded = jwt.verify(token, PRIVATE_KEY);
			return decoded;
		}
	}
}
