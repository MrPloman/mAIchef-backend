import { MailTemplateTypes } from '../types/mail-templates.type';

export interface MailInterface {
  email: string;
  subject: string;
  content: string;
  token: string;
  template: MailTemplateTypes;
}
