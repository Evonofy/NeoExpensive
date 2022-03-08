import { Button } from '@components/Button';
import { Link } from '@components/Link';

export default function EmailCode() {
  return (
    <div>
      <h3>we sent a code to your e-mail</h3>

      <Link href="/">
        <Button type="button">Go to homepage</Button>
      </Link>
    </div>
  );
}
