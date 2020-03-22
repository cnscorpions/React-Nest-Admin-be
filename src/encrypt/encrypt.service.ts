import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptService {

    // 默认此参数即可，改动可能会托慢请求
    // saltRounds = 10;

    // 加密
    async getEncrypted(pwd, saltRounds = 10) {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(pwd, salt);
    }

    // 验证 
    async validate(pwd, pwdHash) {
        return await bcrypt.compareSync(pwd, pwdHash);
    }

}
