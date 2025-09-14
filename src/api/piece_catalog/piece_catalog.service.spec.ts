import { Test, TestingModule } from '@nestjs/testing';
import { PieceCatalogService } from './piece_catalog.service';

describe('PieceCatalogService', () => {
  let service: PieceCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PieceCatalogService],
    }).compile();

    service = module.get<PieceCatalogService>(PieceCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
