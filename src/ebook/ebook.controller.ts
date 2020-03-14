import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { EbookService } from "./ebook.service";
import { UPLOAD_DIR } from "../utils/constant";
import { Book } from "./models/Book";

@Controller('ebook')
export class EbookController {

	constructor(private readonly ebookService: EbookService) {}

	// upload ebook
	@Post("upload")
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("file", { dest: UPLOAD_DIR }))
	async uploadEbook(@UploadedFile() file) {
		const book = new Book(file);
		const result = await this.ebookService.create(book);
		return result;
	}

	@Get("list")
	@UseGuards(AuthGuard)
	async getEbookList() {
		const result = await this.ebookService.findAll();
		return result;
	}

	@Post("delete")
	@UseGuards(AuthGuard)
	async removeEbook(@Body() body) {
		const { id, filePath } = body;
		return this.ebookService.delete(id, filePath);
	}

}
