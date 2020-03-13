import { IsString, IsNumber } from "class-validator";

export class EbookDto {

	@IsString()
	readonly fileName: string; // 文件名

	@IsString()
	readonly filePath: string; // epub文件路径

	@IsString()
	readonly url: string; // epub文件url

	@IsString()
	readonly title: string; // 标题

	@IsString()
	readonly author: string; // 作者

	@IsString()
	readonly publisher: string; // 出版社


	readonly contents: any[]; // 目录

	@IsString()
	readonly cover: string; // 封面图片URL

	@IsNumber()
	readonly category: number; // 分类ID

	@IsString()
	readonly categoryText: string; // 分类名称

	@IsString()
	readonly language: string; // 语种

	@IsString()
	readonly originalName: string; // 原文件名

}