import { Module } from "@nestjs/common";
import { ExcelController } from "./excel.controller";
import { ExcelService } from "./excel.service";
import { AuthService } from "src/auth/auth.service";

@Module({
  controllers: [ExcelController],
  providers: [ExcelService, AuthService]
})
export class ExcelModule {}
