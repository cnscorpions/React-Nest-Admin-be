import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { FileService } from "./file.service";
import { UPLOAD_DIR } from "../utils/constant";
import { File } from "./models/File";

@Controller('file')
export class FileController {

	constructor(private readonly fileService: FileService) {}

	// upload ebook
	@Post("upload")
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("file", { dest: UPLOAD_DIR }))
	async uploadFile(@UploadedFile() file, @Body() body) {
		console.log(file, body['user']);
		const fileObj = new File(file, body['user']);
		const result = await this.fileService.create(fileObj);
		return result;
	}

	@Get("list")
	@UseGuards(AuthGuard)
	async getFileList() {
		const result = await this.fileService.findAll();
		return result;
	}

	@Post("delete")
	@UseGuards(AuthGuard)
	async removeFile(@Body() body) {
		const { id, filePath } = body;
		return this.fileService.delete(id, filePath);
	}

}
