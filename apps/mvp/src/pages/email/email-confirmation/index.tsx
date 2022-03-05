import { Button } from '@components/Button';
import { Link } from '@components/Link';

export default function EmailConfirmation() {
  return (
    <div>
      <h3>we sent you a confirmation e-mail</h3>

      <Link href="/">
        <Button type="button">Go to homepage</Button>
      </Link>
    </div>
  );
}
