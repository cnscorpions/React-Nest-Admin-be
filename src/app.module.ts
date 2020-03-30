import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AuthService } from "./auth/auth.service";
import { FileModule } from "./file/file.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot("mongodb://localhost:37017/adminDb", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService]
})
export class AppModule {}
