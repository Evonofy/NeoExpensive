import { BaseMailTemplate } from './MailTemplate';

interface RegistrationMailProps {
  name: string;
  token: string;
}

export const RegistrationMailTemplate = ({
  name,
  token
}: RegistrationMailProps) => {
  return `
    ${BaseMailTemplate(
      `
        <h1>Hello ${name}!</h1>
        <p>
          You're one step from <strong>full</strong> account activation and Neo Expensive platform access!
        </p>
        <button>
          <a href="${process.env.API_URL}/user/activate?token=${token}">Activate</a>
        </button>
      `,
      {
        icon: 'alert'
      }
    )}
  `;
};
