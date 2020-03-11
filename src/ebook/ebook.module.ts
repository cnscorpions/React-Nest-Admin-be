import { Module } from '@nestjs/common';
import { EbookController } from './ebook.controller';
import { EbookService } from './ebook.service';
import { AuthService } from "../auth/auth.service";

@Module({
  controllers: [EbookController],
  providers: [EbookService, AuthService]
})
export class EbookModule {}
