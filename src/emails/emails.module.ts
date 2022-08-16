import { Global, Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.AWS_EMAIL_HOST,
        port: process.env.AWS_EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.AWS_USER_ID, // generated ethereal user
          pass: process.env.AWS_USER_PASSWORD // generated ethereal password
        },
      },
      defaults: {
        from: '"Support" <ebloqs@ebloqs.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService]
})
export class EmailsModule {}
