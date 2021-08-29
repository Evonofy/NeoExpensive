import { Name, Options, allHandleProps } from '@user/services/queue';

/* Job configuration */
import { IMailService } from '@user/services/mail';
let mailService: IMailService;
export class JobConfig {
  constructor(private mailService: IMailService) {}

  async execute() {
    mailService = this.mailService;
  }
}

export { mailService };

export interface BaseJOB {
  key: Name;
  options?: Options;
  handle: (data: allHandleProps) => Promise<void>;
}
