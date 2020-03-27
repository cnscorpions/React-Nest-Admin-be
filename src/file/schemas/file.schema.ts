import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
	fileName: String, // 文件名
	uploader: String, // 上传者
	timeOfUpload: Number, // 上传时间
	fileSize: String, // 文件大小
	filePath: String, // 文件路径
	url: String // 下载地址
});
