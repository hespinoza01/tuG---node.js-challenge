import dotenv from 'dotenv'

dotenv.config()

/* constants for application configuration */
export default Object.freeze({
    SECRET_KEY: process.env.SECRET_KEY || '@ppb4cK3ndT310',
    JWT_SECRET_SIGN: process.env.JWT_SECRET_SIGN || 'secretsign',
    SERVER_PORT: process.env.SERVER_PORT || 4200,
    NODE_ENV: process.env.NODE_ENV,
    DB: {
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USERNAME,
        PASS: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST || 'localhost',
        DIALECT: process.env.DB_DIALECT || 'mysql',
    },
})
