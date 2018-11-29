import { NgxsAbModule } from './ngxs.module';

describe('NgxsAbModule', () => {
  let ngxsAbModule: NgxsAbModule;

  beforeEach(() => {
    ngxsAbModule = new NgxsAbModule();
  });

  it('should create an instance', () => {
    expect(NgxsAbModule).toBeTruthy();
  });
});
