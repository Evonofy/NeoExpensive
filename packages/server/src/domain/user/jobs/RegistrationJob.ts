import { BaseJOB, mailService } from './JobDTO';

import { RegistrationMailTemplate } from '@user/template';

export const RegistrationJob: BaseJOB = {
  key: 'RegistrationMail',
  handle: async ({ data }) => {
    const { name, email, token } = data;
    await mailService.sendMail({
      to: {
        name,
        email
      },
      subject: "You're one step from entering.",
      body: RegistrationMailTemplate({ name, token }),
      isNoReply: false
    });
  }
};
