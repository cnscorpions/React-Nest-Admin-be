import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { ResetPwdDto } from "./dto/resetPwd.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";
import { AuthService } from "../auth/auth.service";
import { EncryptService } from "src/encrypt/encrypt.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly authService: AuthService,
    private readonly encryptService: EncryptService
  ) {}

  // 验证登录用户
  async validateLogin(Body) {
    const { username, password } = Body;
    const user = await this.findUser(username);
    // 拿到角色
    const { roles, isEnabled } = user;
    // 用户存在且密码正确
    const isAuthedUser = await this.encryptService.validate(
      password,
      user.password
    );
    if (user && isAuthedUser) {
      const token = this.authService.createJWT(username);
      return {
        username: username,
        roles: roles,
        isEnabled: isEnabled,
        token: token
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "账户密码不正确，请重新输入！"
        },
        403
      );
    }
  }

  // 用户注册
  async createUser(userDto: UserDto): Promise<any> {
    const { username, password, roles = ["user"], isEnabled = false } = userDto;
    const user = await this.findUser(username);
    console.log("user", user);
    // 验证用户是否存在（不能为admin）
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "用户已经存在"
        },
        403
      );
    } else if (username === "admin") {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "无权注册admin"
        },
        403
      );
    }
    // 给用户加密
    const hashPwd = await this.encryptService.getEncrypted(password);
    // 创建user（root用户此方法无法创建）
    const newUser = new this.userModel({
      username: username,
      password: hashPwd,
      roles: roles,
      isEnabled: isEnabled
    });
    await newUser.save();
    return `注册${username}成功！`;
  }

  // 重置密码
  async resetPassword(resetPwdDto: ResetPwdDto) {
    const { username, oldPwd, newPwd } = resetPwdDto;
    const user = await this.findUser(username);
    const isAuthedUser = await this.encryptService.validate(
      oldPwd,
      user.password
    );
    if (user && isAuthedUser && username !== "admin") {
      const hashPwd = await this.encryptService.getEncrypted(newPwd);
      const result = await this.update(user["id"], hashPwd);
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "用户已经存在"
        },
        403
      );
    }
  }

  // query in mongodb
  private async findUser(username: string): Promise<User> {
    return this.userModel
      .findOne(
        {
          username: username
        },
        {
          username: 1,
          password: 1,
          roles: 1,
          _id: 0
        }
      )
      .exec();
  }

  // query all
  async findAllUsers(): Promise<User[]> {
    return this.userModel
      .find(
        {},
        {
          password: 0
        }
      )
      .exec();
  }

  // update in mongodb
  private async update(id: string, pwd: string) {
    return this.userModel
      .updateOne(
        {
          id: id
        },
        {
          password: pwd
        }
      )
      .exec();
  }
}
