import { UPLOAD_DIR, MIME_TYPE_EPUB } from "../../utils/constant";
import * as fs from "fs";

export class Book {

    fileName: string; // 文件名
    path: string; // epub文件路径
    filePath: string; // epub文件路径
    url: string; // epub文件url
    title: string; // 标题
    author: string; // 作者
    publisher: string; // 出版社
    contents: any[]; // 目录
    cover: string; // 封面图片URL
    category: number; // 分类ID
    categoryText: string; // 分类名称
    language: string; // 语种
    originalName: string; // 原文件名

	constructor(file, data?: any) {
		if (file) {
			this.createBookFromFile(file);
		} else {

		}
	}

	private createBookFromFile(file) {

		const {
			destination: des, // 文件本地存储目录
			filename, // 文件名称
			mimetype = MIME_TYPE_EPUB // 文件资源类型
		} = file;

		const suffix = mimetype === MIME_TYPE_EPUB ? ".epub" : ""; // 后缀名
		const oldBookPath = `${des}/${filename}`;
		const bookPath = `${des}/${filename}${suffix}`;
		const url = `${UPLOAD_DIR}/book/${filename}${suffix}`;
        
        if (fs.existsSync(oldBookPath) && !fs.existsSync(bookPath)) {
          fs.renameSync(oldBookPath, bookPath) // 重命名文件
        }

        this.fileName = filename // 文件名
        this.path = `/book/${filename}${suffix}` // epub文件路径
        this.filePath = this.path // epub文件路径
        this.url = url // epub文件url
        this.title = '' // 标题
        this.author = '' // 作者
        this.publisher = '' // 出版社
        this.contents = [] // 目录
        this.cover = '' // 封面图片URL
        this.category = -1 // 分类ID
        this.categoryText = '' // 分类名称
        this.language = '' // 语种
        this.originalName = file.originalname

	}

}