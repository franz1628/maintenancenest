import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }


  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }

  @Post(':id/uploadLogo')
  @ApiOperation({ summary: 'Upload a logo for a brand' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/brand',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    }),
    limits: { fileSize: 500 * 1024 }, // 500 KB
    fileFilter: (req, file, callback) => {
      const allowedTypes = /jpg|jpeg|png/;
      const ext = extname(file.originalname).toLowerCase();
      const mimeType = file.mimetype;

      if (
        allowedTypes.test(ext) &&
        (mimeType === 'image/jpeg' || mimeType === 'image/png')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Solo se permiten imágenes JPG, JPEG o PNG'), false);
      }
    },
  }))
  uploadLogo(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.brandService.uploadLogo(+id, file);
  }
}
