import { Test, TestingModule } from '@nestjs/testing';
import { ToolCatalogController } from './tool_catalog.controller';
import { ToolCatalogService } from './tool_catalog.service';

describe('ToolCatalogController', () => {
  let controller: ToolCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolCatalogController],
      providers: [ToolCatalogService],
    }).compile();

    controller = module.get<ToolCatalogController>(ToolCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
