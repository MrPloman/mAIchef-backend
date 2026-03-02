// infrastructure/adapters/bcrypt-hash.adapter.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import React from 'react';
import { Resend } from 'resend';
import { MailInterface } from '../../domain/entities/mail.interface';
import { MailRepository } from '../../domain/ports/mail.repository';
import { ResetPasswordTemplate } from '../templates/reset-password.template';

@Injectable()
export class MailAdapter implements MailRepository {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailAdapter.name);

  constructor(private readonly config: ConfigService) {
    this.resend = new Resend(config.get<string>('RESEND_API_KEY'));
  }
  async send(mailParams: MailInterface): Promise<void> {
    // reset-template
    const resetUrl = `${this.config.get('FRONTEND_APP_URL')}/${mailParams.template}${mailParams.template && `?token=${mailParams.token}`}`;

    const html = await render(
      React.createElement(ResetPasswordTemplate, {
        username: mailParams.email,
        resetUrl,
      }),
    );
    const { error } = await this.resend.emails.send({
      from: 'Mi App <no-reply@miapp.com>',
      to: mailParams.email,
      subject: 'Recupera tu contraseña',
      html,
    });

    if (error) {
      this.logger.error('Error enviando email de recuperación', error);
      throw new Error('No se pudo enviar el email');
    }
    return;
  }
}
