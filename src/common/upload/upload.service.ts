import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File) {
    if (!file) {
      throw new InternalServerErrorException('there is no file');
    }

    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
    };
  }

  async saveFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new InternalServerErrorException('there are no files');
    }

    return files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
    }));
  }
}
