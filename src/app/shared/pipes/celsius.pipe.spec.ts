import { CelsiusFarenheitPipe } from './celsius.pipe';

describe('CelsiusFarenheitPipe', () => {
  it('create an instance', () => {
    const pipe = new CelsiusFarenheitPipe();
    expect(pipe).toBeTruthy();
  });
});
