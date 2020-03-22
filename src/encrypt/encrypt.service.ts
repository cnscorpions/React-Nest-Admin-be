import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptService {

    // 默认此参数即可，改动可能会托慢请求
    saltRounds = 10;

    // 加密
    getEncrypted(pwd, saltRounds) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pwd, salt, (err, hash) => {
                console.log(hash);
            })
        })
    }

    // 验证 
    async validate(pwd, pwdHash) {
        return await bcrypt.compareSync(pwd, pwdHash);
    }

}
