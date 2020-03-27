import { Document } from "mongoose";

export interface IFile extends Document {
	readonly fileName: string; // 文件名
	readonly uploader: string; // 上传者
	readonly timeOfUpload: number; // 上传时间
	readonly fileSize: string; // 文件大小
	readonly filePath: string; // 文件路径
	readonly url: string; // 下载地址
}