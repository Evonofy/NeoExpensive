import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useContextSelector } from 'use-context-selector';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import { Coupon } from '@src/types/auth';
import Modal, { ModalHandles } from '@components/Modal';
import { AuthContext } from '@context/auth';
import { ProductsContext } from '@context/products';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type CouponFormProps = {
  coupon: string;
};

type AddressFormProps = {
  street: string;
  neighborhood: string;
  complement: string;
  cep: string;
};

type CardFormProps = {
  number: string;
  expiration: string;
  cvv: string;
};

export default function Checkout() {
  const modalRef = useRef<ModalHandles>(null);
  const addressFormRef = useRef<FormHandles>(null);
  const couponFormRef = useRef<FormHandles>(null);
  const cardFormRef = useRef<FormHandles>(null);

  const navigate = useNavigate();
  const user = useContextSelector(AuthContext, (context) => context.user);
  const { clearCart, addAddress, addProductToCart, removeOneProductQuantity, removeProductFromCart, removeAddress, addCard, removeCard, createOrder } = useContext(ProductsContext);

  const [canProceed, setCanProceed] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedCardId, setSelectedCardId] = useState('');
  const [step, setStep] = useState(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const total = useMemo(() => {
    // deduct price from coupons
    const totalProductsPrice = user?.cart?.map(({ price, quantity }) => price * quantity).reduce((previous, current) => previous + current, 0) || 0;

    const totalCouponsPrice = coupons.map(({ price }) => price).reduce((previous, next) => previous + next, 0);

    return Math.max(totalProductsPrice - totalCouponsPrice, 0);
  }, [coupons, user?.cart]);

  const handleAddCoupon: SubmitHandler<CouponFormProps> = useCallback(
    ({ coupon }) => {
      const localCoupons = JSON.parse(localStorage.getItem('@neo:coupon') || '[]') as Coupon[];

      if (!localCoupons.find(({ title }) => coupon === title)) {
        couponFormRef.current?.setFieldError('coupon', "That coupon does't exist");
        return;
      }

      const couponAlreadyExists = coupons.find(({ title }) => title === coupon);

      if (couponAlreadyExists) {
        couponFormRef.current?.setFieldError('coupon', 'That coupon is already applied');
        return;
      }

      const localCoupon = localCoupons.find(({ title }) => coupon === title);
      if (localCoupon) {
        setCoupons((coupons) => [
          ...coupons,
          {
            ...localCoupon,
            title: coupon,
          },
        ]);
      }
    },
    [coupons]
  );

  const handleRemoveCoupon = useCallback((id: string) => {
    setCoupons((coupons) => coupons.filter((_coupon) => _coupon.id !== id));
  }, []);

  const handleIncreaseStep = useCallback(() => {
    setCanProceed(false);
    setStep((step) => step + 1);
  }, []);

  const handleDecreaseStep = useCallback(() => {
    setCanProceed(true);
    setStep((step) => step - 1);
  }, []);

  const handleAddAddress: SubmitHandler<AddressFormProps> = useCallback(
    ({ cep, neighborhood, street }) => {
      if (user?.addresses?.find((address) => address.cep === cep)) {
        addressFormRef.current?.setFieldError('cep', 'An address with this CEP already exists.');

        return;
      }

      if (user?.addresses?.find((address) => address.street === street)) {
        addressFormRef.current?.setFieldError('street', 'An address with this street already exists.');

        return;
      }

      addAddress({
        cep,
        neighborhood,
        street,
      });
    },
    [addAddress, user?.addresses]
  );

  const handleCanProceed = useCallback(() => {
    setCanProceed(false);

    if (step === 0) {
      setCanProceed(true);
      return;
    }

    if (step === 1) {
      if (!selectedAddressId) {
        setCanProceed(false);
        return;
      }

      if (selectedAddressId) {
        setCanProceed(true);
        return;
      }

      if (addressFormRef.current) {
        const { cep, street, neighborhood } = addressFormRef.current?.getData() as AddressFormProps;

        if (!cep || !street || !neighborhood) {
          setCanProceed(false);
          return;
        }
      }
    }

    if (step === 2) {
      if (!selectedCardId) {
        setCanProceed(false);
        return;
      }

      if (selectedCardId) {
        setCanProceed(true);
        return;
      }
      if (cardFormRef.current) {
        const { cvv, expiration, number } = cardFormRef.current?.getData() as CardFormProps;

        if (!cvv || !expiration || !number) {
          setCanProceed(false);
          return;
        }
      }
    }
  }, [selectedAddressId, selectedCardId, step]);

  const handleRemoveAddress = useCallback(
    (id: string) => {
      removeAddress(id);
    },
    [removeAddress]
  );

  const handleAddCard: SubmitHandler<CardFormProps> = useCallback(
    ({ number, expiration, cvv }) => {
      addCard({
        expiration,
        cvv,
        number,
      });
    },
    [addCard]
  );

  const handleRemoveCard = useCallback(
    (id: string) => {
      removeCard(id);
    },
    [removeCard]
  );

  const handleSubmit = useCallback(() => {
    createOrder({
      selectedAddressId,
      selectedCardId,
      cart: user?.cart!,
      coupons,
      total,
    });
    // create order
    navigate('/checkout/success');
  }, [coupons, createOrder, navigate, selectedAddressId, selectedCardId, total, user?.cart]);

  return (
    <div>
      <header>
        {step === 0 && <h1>carrinho</h1>}
        {step === 1 && <h1>entrega</h1>}
        {step === 2 && <h1>pagamento</h1>}
      </header>

      <main>
        {step === 0 && (
          <div>
            <ul>
              {user?.cart?.map(({ id, name, price, productId, quantity }) => (
                <li key={id}>
                  <div>
                    {name} - {price}
                    <Button onClick={() => removeProductFromCart(productId)}>X</Button>
                  </div>

                  <div>{quantity}</div>

                  <div>
                    <Button onClick={() => addProductToCart(productId)}>+</Button>
                    <Button disabled={quantity === 1} onClick={() => removeOneProductQuantity(productId)}>
                      -
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button onClick={clearCart}>Clean cart</Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <Button onClick={() => modalRef.current?.handleOpenModal()}>Add a new address</Button>

            <fieldset>
              <ul>
                {user?.addresses?.map(({ id, cep, street }) => (
                  <li key={id}>
                    <label htmlFor={id}>
                      <input
                        name="address"
                        value={id}
                        id={id}
                        type="radio"
                        onFocus={(event) => {
                          setSelectedAddressId(event.target.value);
                          setCanProceed(true);
                        }}
                      />
                      {cep} - {street}
                    </label>

                    <button onClick={() => handleRemoveAddress(id)}>remove</button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <Modal ref={modalRef} visible={false}>
              <Form ref={addressFormRef} onSubmit={handleAddAddress}>
                <Input onChange={handleCanProceed} required name="cep" label="Enter your CEP" placeholder="Cep" onBlur={() => addressFormRef.current?.setFieldError('cep', '')} onFocus={() => addressFormRef.current?.setFieldError('cep', '')} />
                <Input onChange={handleCanProceed} required name="street" label="Enter your street" placeholder="Street" onBlur={() => addressFormRef.current?.setFieldError('street', '')} onFocus={() => addressFormRef.current?.setFieldError('street', '')} />
                <Input onChange={handleCanProceed} required name="neighborhood" label="Enter your neighborhood" placeholder="Neighborhood" />
                <Input name="complement" label="Enter your complement" placeholder="Complement" />

                <Button type="submit">Add address</Button>
              </Form>
            </Modal>
          </div>
        )}

        {step === 2 && (
          <div>
            <ul>
              <li>cartão</li>
              <li>pix</li>
            </ul>

            <ul>
              <li>
                <Form ref={cardFormRef} onSubmit={handleAddCard}>
                  <Input name="number" label="Card number" placeholder="0000.000.0" />
                  <Input name="expiration" label="Card expiration" placeholder="12/12" />
                  <Input name="cvv" label="CVV" placeholder="021" />

                  <Button type="submit">create card</Button>
                </Form>
              </li>

              {user?.cards?.map(({ id, number, expiration, cvv }) => (
                <li key={id}>
                  <label htmlFor={id}>
                    <input
                      id={id}
                      name="card"
                      value={id}
                      type="radio"
                      onFocus={(event) => {
                        setSelectedCardId(event.target.value);
                        setCanProceed(true);
                      }}
                    />
                    {expiration} - {cvv}
                  </label>
                  <strong>{number}</strong>
                  <button onClick={() => handleRemoveCard(id)}>delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <aside>
        <Form ref={couponFormRef} onSubmit={handleAddCoupon}>
          <Input name="coupon" label="Enter a coupon" placeholder="Enter any coupon" onFocus={() => couponFormRef.current?.setFieldError('coupon', '')} onBlur={() => couponFormRef.current?.setFieldError('coupon', '')} />

          <Button variant="3D">Apply</Button>
        </Form>

        <div>
          <ul>
            {coupons?.map((coupon) => (
              <li key={coupon.id}>
                <p style={{ color: 'green' }}>
                  coupons: {coupon?.title} - {coupon.price}
                  <Button onClick={() => handleRemoveCoupon(coupon.id)}>X</Button>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>${total - total * 0.1}</h3>
        </div>

        <div>
          <h3>${total - total * 0.1}</h3>
          <p>12x de ${((total - total * 0.1) / 10).toFixed(2)}</p>
          <p>sem juros</p>
        </div>

        <div>
          <h3>${total}</h3>
          <p>10% de desconto</p>
        </div>

        {step > 0 && (
          <div>
            <Button onClick={handleDecreaseStep}>Back</Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <Button disabled={!canProceed} onClick={handleSubmit}>
              submit
            </Button>
          </div>
        )}
        <div>
          <Button disabled={(step !== 0 && !canProceed) || step === 2} onClick={handleIncreaseStep}>
            Next
          </Button>
        </div>
      </aside>
    </div>
  );
}
