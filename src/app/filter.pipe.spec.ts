import { hotelFilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new hotelFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
