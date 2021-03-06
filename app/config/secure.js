const { env } = process
const isDev = env.NODE_ENV === 'development'

module.exports = {
  // 数据库相关
  db: {
    dialect: 'mariadb',
    name: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    // 默认是 console.log，设置 false 关闭 log。详见：
    // https://sequelize.org/master/manual/getting-started.html#logging
    logging: false,
    timezone: '+08:00',
  },
  // JWT 相关
  jwt: {
    // 可以任意随机字符串（长度适当，不要过长或过短）
    secretKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()',
    // JWT 过期时间（单位 s）
    expiresIn: 60 * 60 * (isDev ? 24 : 1),
  },
  // 微信相关
  wx: {
    // 小程序开发者 ID
    appId: env.WX_APP_ID,
    // 小程序开发者密钥
    appSecret: env.WX_APP_SECRET,
    // 获取用户唯一标识 OpenID、用户在微信开放平台帐号下的唯一标识 UnionID（若当前小程序已绑定到微信开放平台帐号）和 会话密钥 session_key
    // 详见：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
  // 随机账号生成（前缀 + uid）。用户注册时，会自动生成一个随机账号，可用于登录。
  account: {
    // 前缀
    prefix: '_',
    // 生成 uid 的长度
    uidLength: 13,
  },
  // session 相关。详见：https://github.com/koajs/session
  session: {
    // 用于给 Cookie 签名
    keys: ['ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()'],
    options: {
      // 生成 Cookie 的 key
      key: 'user_session',
      // 过期时间十分钟（单位 ms）
      maxAge: 1000 * 60 * 10,
    },
  },
  // 邮件相关
  email: {
    // 发送方的邮箱
    authUser: 'liuyibo0616@qq.com',
    // 授权码（不是邮箱登录密码）
    authPass: env.EMAIL_AUTH_PASS,
    // 发送方的称呼（人名、公司名、产品名、等）
    from: '[your name]',
    // 主题
    subject: '验证码信息',
  },
}
