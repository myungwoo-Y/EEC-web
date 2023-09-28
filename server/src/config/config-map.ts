const isProd = process.env.NODE_ENV === 'production';

const configMap = {
  migrations: [isProd ? 'migrations-prod/*{.ts,.js}' : 'migrations/*{.ts,.js}'],
  envPath: isProd ? '.env.prod' : '.env',
  cookieDomain: isProd ? '.kfvetp.com' : '.local.com',
  domain: isProd ? 'https://kfvetp.com' : 'http://kfvetp.local.com:3000',
};

export default configMap;