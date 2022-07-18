import { useRef } from 'react';

type Address = {
  zipcode: string;
  street: string;
  neighborhood: string;
};

type CreateAddressProps = {
  onSubmit: (props: Address) => void;
};

export function CreateAddress({ onSubmit }: CreateAddressProps) {
  const zipcode = useRef<HTMLInputElement>(null);
  const street = useRef<HTMLInputElement>(null);
  const neighborhood = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          zipcode: zipcode.current?.value || '',
          neighborhood: neighborhood.current?.value || '',
          street: street.current?.value || '',
        });
      }}
    >
      <input type="text" placeholder="CEP" name="zipcode" ref={zipcode} />
      <input type="text" placeholder="Rua" name="street" ref={street} />
      <input type="text" placeholder="Bairro" name="neighborhood" ref={neighborhood} />

      <button>create new address +</button>
    </form>
  );
}
