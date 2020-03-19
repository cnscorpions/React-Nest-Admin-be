import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
	fileName: String,
	filePath: String,
	url: String,
	title: String,
	originalName: String
});
