import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
    constructor(private mailerService: MailerService) {}

    async sendVerificationEmails(toEmail: string) { 
        try {
            const respValidating = await this.mailerService.sendMail({
                to: toEmail,
                from: 'user@outlook.com', // Senders email address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', 
            });


            console.log(respValidating);
    
            return respValidating;
        } catch (e) {
            console.log(`Error al enviar un email ${e}`)
            throw new HttpException(e, 304)
        }

    }
}
