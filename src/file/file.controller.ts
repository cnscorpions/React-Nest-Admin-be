import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { FileService } from "./file.service";
import { UPLOAD_DIR } from "../utils/constant";
import { File } from "./models/File";

@Controller('file')
@UseGuards(AuthGuard, RolesGuard)
export class FileController {

	constructor(private readonly fileService: FileService) {}

	// upload
	@Post("upload")
	@Roles(["admin"])
	@UseInterceptors(FileInterceptor("file", { dest: UPLOAD_DIR }))
	async uploadFile(@UploadedFile() file, @Body() body) {
		console.log(file, body['user']);
		const fileObj = new File(file, body['user']);
		const result = await this.fileService.create(fileObj);
		return result;
	}

	@Get("list")
	async getFileList() {
		const result = await this.fileService.findAll();
		return result;
	}

	@Post("delete")
	@Roles(["admin"])
	async removeFile(@Body() body) {
		const { id, filePath } = body;
		return this.fileService.delete(id, filePath);
	}

}
