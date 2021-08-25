interface RegistrationMailProps {
  name: string;
  token: string;
}

export const RegistrationMailTemplate = ({
  name,
  token
}: RegistrationMailProps) => {
  return `
    <div>
      <h1>Hello ${name}, you're one step from entering our platform!</h1>
      <p>Please, click this link to verify your account!</p>
      <button>
        <a href="${process.env.API_URL}">verify</a>
      </button>
    </div>
  `;
};
