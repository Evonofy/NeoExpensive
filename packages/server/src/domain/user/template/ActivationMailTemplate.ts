import { BaseMailTemplate } from './MailTemplate';

interface ActivationMailProps {
  name: string;
}

export const ActivationMailTemplate = ({ name }: ActivationMailProps) => {
  return BaseMailTemplate(
    `
    <h1>Welcome ${name}!</h1>
    <p>
      We're so glad to see you finally arrived!
    </p>
    <button>
      <a href="${process.env.APP_URL}/welcome">Go to the platform</a>
    </button>
  `,
    {
      icon: 'success'
    }
  );
};
