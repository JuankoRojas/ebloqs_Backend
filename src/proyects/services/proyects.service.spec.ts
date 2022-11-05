import { Test, TestingModule } from '@nestjs/testing';
import { ProyectsService } from './proyects.service';

describe('ProyectsService', () => {
  let service: ProyectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectsService],
    }).compile();

    service = module.get<ProyectsService>(ProyectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
