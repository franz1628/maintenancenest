import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDetailService } from './service_detail.service';

describe('ServiceDetailService', () => {
  let service: ServiceDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceDetailService],
    }).compile();

    service = module.get<ServiceDetailService>(ServiceDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
