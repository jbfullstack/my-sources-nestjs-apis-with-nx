export const configuration = () => ({
  environment: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  admin_email: process.env.ADMIN_EMAIL,
  admin_pseudo: process.env.ADMIN_PSEUDO,
  admin_password: process.env.ADMIN_PASSWORD,
  admin_role_id: parseInt(process.env.ADMIN_ROLE_ID),
  debug: process.env.DEBUG,
  debug_guards: process.env.DEBUG_GUARDS,
  jwt_expire: parseInt(process.env.JWT_EXPIRE),
  jwt_secret: process.env.JWT_SECRET,
});
