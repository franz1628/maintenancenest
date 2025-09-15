import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCatalogController } from './service_catalog.controller';
import { ServiceCatalogService } from './service_catalog.service';

describe('ServiceCatalogController', () => {
  let controller: ServiceCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCatalogController],
      providers: [ServiceCatalogService],
    }).compile();

    controller = module.get<ServiceCatalogController>(ServiceCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
