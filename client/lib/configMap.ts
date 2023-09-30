const isProd = process.env.NODE_ENV === 'production';

const configMap = {
  serverUrl: isProd ? 'https://api.kfvetp.com' : 'http://kfvetp.local.com:8080',
  loginUrl: isProd ? 'https://www.kfvetp.com/login?redirect=true' : 'http://kfvetp.local.com:3000/login?redirect=true',
};

export default configMap;
