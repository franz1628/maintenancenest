import { Test, TestingModule } from '@nestjs/testing';
import { MecanicController } from './mecanic.controller';
import { MecanicService } from './mecanic.service';

describe('MecanicController', () => {
  let controller: MecanicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MecanicController],
      providers: [MecanicService],
    }).compile();

    controller = module.get<MecanicController>(MecanicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
