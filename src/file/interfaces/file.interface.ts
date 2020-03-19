import { Document } from "mongoose";

export interface File extends Document {
	readonly fileName: string; // 文件名
    readonly filePath: string; // epub文件路径
    readonly url: string; // epub文件url
    readonly uploader: string; // 上传者
    readonly timeOfUpload: number; // 上传时间
    readonly fileSize: string; // 文件大小
}