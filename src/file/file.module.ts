import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from "./schemas/file.schema";
import { FileController } from './file.controller';
import { FileService } from './file.service'
import { AuthService } from "../auth/auth.service";

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: "File",
			schema: FileSchema
		}])
	],
  controllers: [FileController],
  providers: [FileService, AuthService]
})
export class FileModule {}
