import { Test, TestingModule } from '@nestjs/testing';
import { TypeDocumentController } from './type_document.controller';
import { TypeDocumentService } from './type_document.service';

describe('TypeDocumentController', () => {
  let controller: TypeDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeDocumentController],
      providers: [TypeDocumentService],
    }).compile();

    controller = module.get<TypeDocumentController>(TypeDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
