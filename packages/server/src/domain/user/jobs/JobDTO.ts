import { Name, Options, allHandleProps } from '@user/services/queue';

/* Job configuration */
// import { MailTrapMailService } from '@user/services/mail/drivers/mailtrap';
import { MockMailService } from '@user/services/mail/drivers/mock';
let mailService = new MockMailService();

export { mailService };

export interface BaseJOB {
  key: Name;
  options?: Options;
  handle: (data: allHandleProps) => Promise<void>;
}
