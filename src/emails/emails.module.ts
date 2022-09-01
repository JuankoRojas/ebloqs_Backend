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
        host: 'email-smtp.us-east-2.amazonaws.com',
        port: process.env.AWS_EMAIL_PORT,
        secure: false, // true for 465, false for other ports
       
        auth: {
          user: 'AKIAU5QACUZ7JBM7TDUS', // generated ethereal user
          pass: 'BMjyKH0FPdGO2v2SJdsqur+OouMtrbTA4+BuYdEwiR7U' // generated ethereal password
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
