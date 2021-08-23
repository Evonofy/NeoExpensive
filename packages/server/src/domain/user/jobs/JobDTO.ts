import { Name, Options, allHandleProps } from '@user/services/queue';

/* Job configuration */
import { MailTrapMailService } from '@user/services/mail/drivers/mailtrap';
const mailService = new MailTrapMailService();

export { mailService };

export interface BaseJOB {
  key: Name;
  options?: Options;
  handle: (data: allHandleProps) => Promise<void>;
}
