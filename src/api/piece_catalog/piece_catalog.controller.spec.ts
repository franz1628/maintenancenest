import { Test, TestingModule } from '@nestjs/testing';
import { PieceCatalogController } from './piece_catalog.controller';
import { PieceCatalogService } from './piece_catalog.service';

describe('PieceCatalogController', () => {
  let controller: PieceCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PieceCatalogController],
      providers: [PieceCatalogService],
    }).compile();

    controller = module.get<PieceCatalogController>(PieceCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
