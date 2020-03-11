import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { EbookService } from "./ebook.service";

@Controller('ebook')
export class EbookController {

	constructor(private readonly ebookService: EbookService) {}

	// upload ebook
	@Post("upload")
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("file", { dest: "uploads/"}))
	uploadEbook(@UploadedFile() file) {

	}

}
