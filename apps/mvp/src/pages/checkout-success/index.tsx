import { Link } from '@components/Link';

export default function CheckoutSuccess() {
  return (
    <div>
      <p>compra feita com sucesso</p>
      <p>mandamos nota fiscal pro seu email</p>

      <Link href="/">go to homepage</Link>
    </div>
  );
}
