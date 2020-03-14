import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ebook } from "./interfaces/ebook.interface";
import { EbookDto } from "./dto/ebook.dto";
import * as fs from "fs";

@Injectable()
export class EbookService {

	constructor(@InjectModel("Ebook") private readonly ebookModel: Model<Ebook>) {

	}

	// 添加电子书
	async create(ebookDto: EbookDto): Promise<Ebook> {
		const createdEbook = new this.ebookModel(ebookDto);
		return createdEbook.save();
	}

	// 查询所有
	async findAll(): Promise<Ebook[]> {
    return this.ebookModel.find().exec();
  }

  // 删除
  async delete(id, filePath): Promise<any> {
  	if (fs.existsSync(filePath)) {
  		fs.unlinkSync(filePath);
  	} else {
  		throw new HttpException({}, 404);
  	}
  	return this.ebookModel.remove({ _id: id }).exec();
  }

}
