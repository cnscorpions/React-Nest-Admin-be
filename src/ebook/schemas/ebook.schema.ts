import * as mongoose from 'mongoose';

export const EbookSchema = new mongoose.Schema({
	fileName: String,
	filePath: String,
	url: String,
	title: String,
	author: String,
	publisher: String,
	contents: Array,
	cover: String,
	ategory: Number,
	categoryText: String,
	language: String,
	originalName: String
});
