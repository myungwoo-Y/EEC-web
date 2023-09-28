const isProd = process.env.NODE_ENV === 'production';

const configMap = {
  migrations: [isProd ? 'migrations-prod/*{.ts,.js}' : 'migrations/*{.ts,.js}'],
  envPath: isProd ? '.env.prod' : '.env',
  cookieDomain: isProd ? '.kfvetp.com' : 'localhost',
};

export default configMap;