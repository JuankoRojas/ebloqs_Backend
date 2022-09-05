import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        postgresUrl: process.env.DATABASE_URL,
        mysql: {
            dbName: "test1",
            port: "3306",
            password: "S*k31MzOVP6k",
            user: "admin",
            host: "database-1.cdz8iclleall.us-east-2.rds.amazonaws.com",
        },

        typeorm: {
            entity_dir: process.env.TYPEORM_ENTITIES,
            migrations: process.env.TYPEORM_MIGRATIONS,
            migrations_dir: process.env.TYPEORM_MIGRATIONS_DIR,
        },
        apiKey: process.env.API_KEY,
        jwtsecret: 'secret',
    };
});
