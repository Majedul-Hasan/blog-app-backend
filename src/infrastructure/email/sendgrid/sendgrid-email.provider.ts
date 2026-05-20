
import sgMail from '@sendgrid/mail';
import config from "@shared/config/env.const";

import {
    EmailProvider,
    SendEmailOptions,
} from "@shared/email/email-provider.interface";

sgMail.setApiKey(
    config.emailSender.sendgrid_api_key
);

export class SendGridEmailProvider
    implements EmailProvider {

    async send(
        options: SendEmailOptions
    ): Promise<void> {

        await sgMail.send({
            to: options.to,
            from: config.emailSender.email,
            subject: options.subject,
            html: options.html,
        });
    }
}