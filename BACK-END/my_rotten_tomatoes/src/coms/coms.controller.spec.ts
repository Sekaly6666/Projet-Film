import { Test, TestingModule } from '@nestjs/testing';
import { ComsController } from './coms.controller';
import { ComsService } from './coms.service';

describe('ComsController', () => {
  let controller: ComsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComsController],
      providers: [ComsService],
    }).compile();

    controller = module.get<ComsController>(ComsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
