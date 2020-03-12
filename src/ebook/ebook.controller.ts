import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
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
	uploadEbook(@UploadedFile() file) {
		let book = new Book(file);
		console.log(file);
	}

}
