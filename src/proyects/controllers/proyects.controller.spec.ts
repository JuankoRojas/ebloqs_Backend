import { Test, TestingModule } from '@nestjs/testing';
import { ProyectsController } from './proyects.controller';

describe('ProyectsController', () => {
  let controller: ProyectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectsController],
    }).compile();

    controller = module.get<ProyectsController>(ProyectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
