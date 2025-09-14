import { Test, TestingModule } from '@nestjs/testing';
import { MecanicService } from './mecanic.service';

describe('MecanicService', () => {
  let service: MecanicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MecanicService],
    }).compile();

    service = module.get<MecanicService>(MecanicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
