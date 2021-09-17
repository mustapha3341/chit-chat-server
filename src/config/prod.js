export const config = {
    secrets: {
        jwt: {
            jwtSecret: process.env.JWT_SECRET_PROD,
            jwtExpires: process.env.JWT_EXPIRES,
        },
    },
    db: {
        url: process.env.DB_PROD,
    },
};
