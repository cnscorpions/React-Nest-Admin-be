import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptService {

    saltRounds = 16;

    // 加密
    getEncrypted(pwd, saltRounds) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pwd, salt, (err, hash) => {
                console.log(hash);
            })
        })
    }

    // 验证 
    validate(pwd, pwdHash) {
        return bcrypt.compareSync(pwd, pwdHash);
    }

}
