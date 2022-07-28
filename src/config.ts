import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        postgresUrl: process.env.DATABASE_URL,
        mysql: {
            dbName: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT, 10),
            password: process.env.MYSQL_ROOT_PASSWORD,
            user: process.env.MYSQL_USERNAME,
            host: process.env.MYSQL_HOST,
        },

        typeorm: {
            entity_dir: process.env.TYPEORM_ENTITIES,
            migrations: process.env.TYPEORM_MIGRATIONS,
            migrations_dir: process.env.TYPEORM_MIGRATIONS_DIR,
        },
        apiKey: process.env.API_KEY,
        jwtsecret: process.env.JWT_SECRET,
    };
});
