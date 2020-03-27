import { UPLOAD_DIR } from "../../utils/constant";
import * as fs from "fs";
import * as mime from "mime";

export class File {

    fileName: string; // 文件名
    filePath: string; // 文件路径
		url: string; // 文件url
		uploader: string; // 上传者
    timeOfUpload: number; // 上传时间
    fileSize: string; // 文件大小

	constructor(file, data?: any) {
		if (file) {
			this.createFile(file, data);
		} else {

		}
	}

	private createFile(file, data) {

		const {
			destination: des, // 文件本地存储目录
			filename, // 文件名称
			mimetype,
			size,
			originalname
		} = file;

		console.log(file);

		const suffix = mimetype === mimetype ? "." + mime.getExtension(mimetype) : ""; // 后缀名
		const oldFilePath = `${des}/${filename}`;
		const filePath = `${des}${filename}${suffix}`;
		const url = `${UPLOAD_DIR}${filename}${suffix}`;
        
    if (fs.existsSync(oldFilePath) && !fs.existsSync(filePath)) {
      fs.renameSync(oldFilePath, filePath) // 重命名文件
    }

    this.fileName = this.generateFileName(originalname, suffix);
    this.filePath = filePath;
		this.url = url;
		this.uploader = data;
		this.timeOfUpload = new Date().getTime();
		this.fileSize = size;

	}

	private generateFileName(originalname: string, suffix: string): string {
		const indexOfDot = originalname.indexOf(".");
		const newFileName = originalname.slice(0, indexOfDot) + '-' + Date.now() + suffix;
		return newFileName;
	}

}