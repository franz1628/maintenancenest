import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDetailCatalogController } from './service_detail_catalog.controller';
import { ServiceDetailCatalogService } from './service_detail_catalog.service';

describe('ServiceDetailCatalogController', () => {
  let controller: ServiceDetailCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceDetailCatalogController],
      providers: [ServiceDetailCatalogService],
    }).compile();

    controller = module.get<ServiceDetailCatalogController>(ServiceDetailCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
