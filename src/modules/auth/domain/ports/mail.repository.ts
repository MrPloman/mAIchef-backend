// application/ports/hash.port.ts

import { MailInterface } from '../entities/mail.interface';

export interface MailRepository {
  send(plain: MailInterface): Promise<string>;
}
