import { ContentCreatorMiddleware } from './content-creator.middleware';

describe('ContentCreatorMiddleware', () => {
  it('should be defined', () => {
    expect(new ContentCreatorMiddleware()).toBeDefined();
  });
});
