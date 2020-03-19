import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File } from "./interfaces/file.interface";
import { FileDto } from "./dto/file.dto";
import * as fs from "fs";

@Injectable()
export class FileService {

	constructor(@InjectModel("File") private readonly fileModel: Model<File>) {

	}

	// 添加
	async create(ebookDto: FileDto): Promise<File> {
		const createdFile = new this.fileModel(FileDto);
		return createdFile.save();
	}

	// 查询所有
	async findAll(): Promise<File[]> {
    return this.fileModel.find().exec();
  }

  // 删除
  async delete(id, filePath): Promise<any> {
  	if (fs.existsSync(filePath)) {
  		fs.unlinkSync(filePath);
  	} else {
  		throw new HttpException({}, 404);
  	}
  	return this.fileModel.remove({ _id: id }).exec();
  }

}
