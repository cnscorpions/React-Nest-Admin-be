import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";

@Controller('ebook')
export class EbookController {

	// upload ebook
	@Post("upload")
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("file"))
	uploadEbook(@UploadedFile() file, @Body() body) {
		console.log(file, body);
	}

}
