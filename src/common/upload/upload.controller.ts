import { 
  Controller, 
  Post, 
  UploadedFile, 
  UploadedFiles, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, 
  }))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveFile(file);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, 
  }))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.saveFiles(files);
  }
}
