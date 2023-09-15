import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectAuthor = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    req.body.author = { username: req.user.username };

    return req.body;
  },
);
