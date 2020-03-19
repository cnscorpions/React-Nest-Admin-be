import { IsString, IsNumber } from "class-validator";

export class FileDto {

	@IsString()
	readonly fileName: string; // 文件名

	@IsString()
	readonly uploader: string; // 上传者

	@IsNumber()
	readonly timeOfUpload: number; // 上传时间

	@IsString()
	readonly fileSize: string; // 文件大小

	@IsString()
	readonly filePath: string; // 文件路径

	@IsString()
	readonly url: string; // 下载地址

}