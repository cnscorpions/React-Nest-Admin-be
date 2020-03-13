import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EbookSchema } from "./schemas/ebook.schema";
import { EbookController } from './ebook.controller';
import { EbookService } from './ebook.service';
import { AuthService } from "../auth/auth.service";

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: "Ebook",
			schema: EbookSchema
		}])
	],
  controllers: [EbookController],
  providers: [EbookService, AuthService]
})
export class EbookModule {}
