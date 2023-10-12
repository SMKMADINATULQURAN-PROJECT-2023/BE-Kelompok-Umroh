import * as dotenv from 'dotenv';
dotenv.config();
export const jwt_config = {
  secret: process.env.JWT_SECRET,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  expired: process.env.JWT_EXPIRED,
};
