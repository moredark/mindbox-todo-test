import { formatTaskCount } from './formatters';

describe('formatTaskCount', () => {
  it('should return "All tasks completed" when count is 0', () => {
    expect(formatTaskCount(0)).toBe('All tasks completed');
  });

  it('should return "1 item left" when count is 1', () => {
    expect(formatTaskCount(1)).toBe('1 item left');
  });

  it('should return "n items left" when count is greater than 1', () => {
    expect(formatTaskCount(2)).toBe('2 items left');
    expect(formatTaskCount(5)).toBe('5 items left');
  });
});
