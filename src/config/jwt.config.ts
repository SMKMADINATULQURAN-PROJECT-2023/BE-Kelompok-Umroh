export const jwt_config = {
  secret: process.env.JWT_SECRET || 'belajar_jwt',
  expired: process.env.JWT_EXPIRED || 3600,
};
