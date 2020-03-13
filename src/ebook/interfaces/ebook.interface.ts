import { Document } from "mongoose";

export interface Ebook extends Document {
	readonly fileName: string; // 文件名
    readonly filePath: string; // epub文件路径
    readonly url: string; // epub文件url
    readonly title: string; // 标题
    readonly author: string; // 作者
    readonly publisher: string; // 出版社
    readonly contents: any[]; // 目录
    readonly cover: string; // 封面图片URL
    readonly ategory: number; // 分类ID
    readonly categoryText: string; // 分类名称
    readonly language: string; // 语种
    readonly originalName: string; // 原文件名
}