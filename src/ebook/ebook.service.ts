import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ebook } from "./interfaces/ebook.interface";
import { EbookDto } from "./dto/ebook.dto";

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

}
