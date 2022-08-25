import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'aws-sdk'


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configSw = new DocumentBuilder()
        .setTitle('EBLOQS-API')
        .setDescription(
            'Todos los servicios de la API de EBLOQS, para el desarrollo de aplicaciones.',
        )
        .setVersion('1.0')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'access_token',
          )
        .build();
    config.update({
        accessKeyId: process.env.AWS_BUCKET_ACCESS,
        secretAccessKey: process.env.AWS_BUCKET_SECRET,
        region: 'us-east-2',
    });
    const document = SwaggerModule.createDocument(app, configSw);
    SwaggerModule.setup('docs', app, document);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
