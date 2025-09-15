import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDetailCatalogService } from './service_detail_catalog.service';

describe('ServiceDetailCatalogService', () => {
  let service: ServiceDetailCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceDetailCatalogService],
    }).compile();

    service = module.get<ServiceDetailCatalogService>(ServiceDetailCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
