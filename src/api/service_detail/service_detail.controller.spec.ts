import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDetailController } from './service_detail.controller';
import { ServiceDetailService } from './service_detail.service';

describe('ServiceDetailController', () => {
  let controller: ServiceDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceDetailController],
      providers: [ServiceDetailService],
    }).compile();

    controller = module.get<ServiceDetailController>(ServiceDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
