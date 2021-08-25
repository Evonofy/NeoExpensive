interface ActivationMailProps {
  name: string;
}

export const ActivationMailTemplate = ({ name }: ActivationMailProps) => {
  return `
    <div>
      <h1>Welcome to Neo Expensive ${name}!</h1>
      <p>We're so glad to see you finally arrived!</p>
      <button>
        <a href="${process.env.APP_URL}/welcome">go to the platform</a>
      </button>
    </div>
  `;
};
