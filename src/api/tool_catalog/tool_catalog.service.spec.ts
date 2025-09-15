import { Test, TestingModule } from '@nestjs/testing';
import { ToolCatalogService } from './tool_catalog.service';

describe('ToolCatalogService', () => {
  let service: ToolCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolCatalogService],
    }).compile();

    service = module.get<ToolCatalogService>(ToolCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
