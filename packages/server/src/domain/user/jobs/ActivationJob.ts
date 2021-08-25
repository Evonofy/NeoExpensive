import { BaseJOB, mailService } from './JobDTO';

import { ActivationMailTemplate } from '@user/template';

export const ActivationJob: BaseJOB = {
  key: 'ActivationMail',
  handle: async ({ data }) => {
    const { name, email } = data;
    await mailService.sendMail({
      to: {
        name,
        email
      },
      subject: 'Welcome to Neo Expensive ${name}!',
      body: ActivationMailTemplate({ name }),
      isNoReply: false
    });
  }
};
