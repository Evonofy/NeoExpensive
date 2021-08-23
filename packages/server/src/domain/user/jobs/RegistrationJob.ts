import { BaseJOB, mailService } from './JobDTO';

export const RegistrationJob: BaseJOB = {
  key: 'RegistrationMail',
  handle: async ({ name, email }) => {
    await mailService.sendMail({
      to: {
        name,
        email
      },
      subject: 'Platform is available!',
      body: 'Welcome to the platform',
      isNoReply: false
    });
  }
};
