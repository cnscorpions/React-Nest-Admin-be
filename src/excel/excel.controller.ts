import { Controller, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { ExcelService } from "./excel.service";

@Controller("excel")
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get("list")
  @Roles(["admin"])
  async getCollectionsList() {
    const data = [
      {
        text: "用户列表",
        collection: "users"
      },
      {
        text: "文件列表",
        collection: "files"
      }
    ];

    return data;
  }
}
