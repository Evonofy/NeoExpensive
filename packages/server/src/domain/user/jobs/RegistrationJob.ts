import { BaseJOB, mailService } from './JobDTO';

export const RegistrationJob: BaseJOB = {
  key: 'RegistrationMail',
  handle: async ({ data }) => {
    const { name, email } = data;
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
