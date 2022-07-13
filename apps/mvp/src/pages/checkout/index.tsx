import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useContextSelector } from 'use-context-selector';

import { Link } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import { Coupon } from '@src/types/auth';
import Modal, { ModalHandles } from '@components/Modal';
import { AuthContext } from '@context/auth';
import { ProductsContext } from '@context/products';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import Vengeance from '../../images/pages/checkout/Vengeance.webp';
import MagnifyingGlass from '../../images/components/header/user-controls/magnifying-glass.svg';
import ShoppingCart from '../../images/components/header/user-controls/shopping-cart.svg';
import Package from '../../images/pages/checkout/undraw_package_arrived.svg';

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

      if (modalRef.current) {
        modalRef.current.handleCloseModal();
      }
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
    <div className="checkout--body">
      <article className="checkout--progress">
        <div className="checkout--progress--wrapper">
          <div className="checkout--progress--circle purple--flavor">
            <h2 className="checkout--circle--h2">Carrinho</h2>
          </div>

          <div className={`checkout--progress--dash ${step >= 1 ? 'purple--flavor' : ''}`}></div>
          <div className={`checkout--progress--circle ${step >= 1 ? 'purple--flavor' : ''}`}>
            <h2 className="checkout--circle--h2">Entrega</h2>
          </div>
          <div className={`checkout--progress--dash ${step >= 2 ? 'purple--flavor' : ''}`}></div>
          <div className={`checkout--progress--circle ${step >= 2 ? 'purple--flavor' : ''}`}>
            <h2 className="checkout--circle--h2">Compra</h2>
          </div>
        </div>
      </article>
      {step === 0 && (
        <React.Fragment>
          {user?.cart?.map(({ id, name, description, image, price, quantity, productId }) => {
            return (
              <section key={id} className="checkout--content checkout1--products--wrapper">
                <img src={image} style={{ width: '160px', height: '160px', margin: '1rem !important' }} alt={description} className="checkout1--image" />
                <div className="checkout1--details">
                  <h2 className="checkout1--title--h2">{name}</h2>
                  <p className="checkout1--title--h2">{description}</p>
                </div>

                <input
                  type="number"
                  value={quantity}
                  name="product-quantity"
                  className="checkout1--quantity"
                  onChange={(event) => {
                    const value = Number(event.target.value);

                    if (value < quantity) {
                      if (quantity === 1) {
                        console.log('dont decrease');
                      } else {
                        removeOneProductQuantity(productId);
                        console.log('decreasing');
                      }
                    } else {
                      addProductToCart(productId);
                      console.log('increasing');
                    }
                  }}
                />

                <div className="checkout1--prices">
                  <h4 className="checkout1--price">R$ {price.toFixed(2)}</h4>
                  <p className="checkout1--price">
                    {12}X de R$ {((price - price * 0.1) / 12).toFixed(2)} s/juros
                  </p>
                </div>

                <button onClick={() => removeProductFromCart(productId)} className="checkout1--button">
                  X
                </button>
              </section>
            );
          })}

          {/* <Button onClick={clearCart}>Clean cart</Button> */}
        </React.Fragment>
      )}

      {step === 1 && (
        <React.Fragment>
          <section className="checkout--content checkout2--location--wrapper">
            <div className="checkout2--title--wrapper">
              <h2 className="checkout2--title--h2">Selecione Uma Localização</h2>
              <h2 onClick={() => modalRef.current?.handleOpenModal()} className="checkout2--title--h2 add--address">
                + Adicionar Localização
              </h2>
            </div>

            {user?.addresses?.map(({ id, street, cep, neighborhood }) => (
              <div
                onFocus={() => {
                  console.log('focusing');
                  setSelectedAddressId(id);
                  setCanProceed(true);
                }}
                key={id}
                className="checkout2--address--wrapper"
              >
                <div className="checkout2--address">
                  <h2 className="checkout2--address--h2 sending--info">Informação De Envios</h2>
                  <h2 className="checkout2--address--h2">{street}</h2>
                  <h3 className="checkout2--address--h3">{neighborhood}</h3>
                  <p className="checkout2--address--zipcode">{cep}</p>
                </div>

                <img src={Package} alt="" className="checkout2--image" />

                <button onClick={() => handleRemoveAddress(id)}>remove</button>
              </div>
            ))}

            <Modal ref={modalRef} visible={false}>
              <Form ref={addressFormRef} onSubmit={handleAddAddress}>
                <Input
                  onChange={handleCanProceed}
                  required
                  name="cep"
                  label="Enter your CEP"
                  placeholder="Cep"
                  onBlur={() => addressFormRef.current?.setFieldError('cep', '')}
                  onFocus={() => addressFormRef.current?.setFieldError('cep', '')}
                />
                <Input
                  onChange={handleCanProceed}
                  required
                  name="street"
                  label="Enter your street"
                  placeholder="Street"
                  onBlur={() => addressFormRef.current?.setFieldError('street', '')}
                  onFocus={() => addressFormRef.current?.setFieldError('street', '')}
                />
                <Input onChange={handleCanProceed} required name="neighborhood" label="Enter your neighborhood" placeholder="Neighborhood" />
                <Input name="complement" label="Enter your complement" placeholder="Complement" />

                <Button type="submit">Add address</Button>
              </Form>
            </Modal>
          </section>
        </React.Fragment>
      )}
      <aside className="checkout--info">
        <div className="checkout--info--wrapper">
          <div className="checkout--zip">
            <input type="text" className="checkout--info--input" />
            <button className="checkout--info--button">Aplicar</button>
            <img src={MagnifyingGlass} alt="" className="checkout--input--image" />
          </div>

          <div className="checkout--info--values">
            <h3 className="checkout--info--h3">Subtotal</h3>
            <h4 className="checkout--info--h4">Frete</h4>

            <hr className="checkout--info--hr" />
            <h4 className="checkout--info--h4">
              Cupons de Disconto: <span className="checkout--discount">R$ 0,00</span>
            </h4>
            <hr className="checkout--info--hr" />

            <div className="checkout--total--wrapper">
              <h2 className="checkout--info--h2">TOTAL</h2> <h2 className="checkout--info--h2 checkout--total">R$ 0,00</h2>
            </div>
          </div>

          <div className="checkout--info--method--wrapper">
            <div className="checkout--info--payment">
              <img src={ShoppingCart} alt="" className="checkout--info--payment--image" />
              <h2 className="checkout--info--h2">R$ 1.999,00</h2>
            </div>

            <h3 className="checkout--info--payment--desc">12x de R$ 166,99 s/juros no cartão</h3>
          </div>
          <div className="checkout--info--method--wrapper">
            <div className="checkout--info--payment">
              <img src={ShoppingCart} alt="" className="checkout--info--payment--image" />
              <h2 className="checkout--info--h2">R$ 1.999,00</h2>
            </div>

            <h3 className="checkout--info--payment--desc">12x de R$ 166,99 s/juros no cartão</h3>
          </div>

          {step > 0 && (
            <Button className="checkout--info--submit" onClick={handleDecreaseStep}>
              Back
            </Button>
          )}

          {step === 2 && (
            <Button className="checkout--info--submit" disabled={!canProceed} onClick={handleSubmit}>
              submit
            </Button>
          )}

          {step < 2 && (
            <Button className="checkout--info--submit" disabled={(step !== 0 && !canProceed) || step === 2} onClick={handleIncreaseStep}>
              Next
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
}
