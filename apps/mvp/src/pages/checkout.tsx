import React, { useCallback, useMemo, useState, useRef } from 'react';
import { FiTag } from 'react-icons/fi';
import { AiOutlineQrcode } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { api, promise } from '@/services/api';

import Vengeance from '../images/pages/checkout/Vengeance.webp';
import ShoppingCart from '../images/components/header/user-controls/shopping-cart.svg';
import PackageArrived from '../images/pages/checkout/undraw_package_arrived.svg';

import Modal, { ModalHandles } from '@/components/modal';
import { CreateAddress } from '@/forms/create-address';

function round(value: number, step: number) {
  step ||= 1;
  const inv = 1.0 / step;
  return Math.ceil(value * inv) / inv;
}

// this function returns how much one value is of another
// ex -> 2 & 4,  2 is 50% of 4
function findPercentageBetweenNumbers(numberA: number, numberB: number) {
  return (numberA / numberB) * 100;
}

const couponValidator = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  percentage: z.boolean().optional(),
});

type Coupon = z.infer<typeof couponValidator>;

const parts = 12;

export default function Checkout() {
  const navigate = useNavigate();
  const addressModal = useRef<ModalHandles>(null);

  const [step, setStep] = useState(0);
  const [canProceed, setCanProceed] = useState(true);

  const [currentCoupon, setCurrentCoupon] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [cart, setCart] = useState([
    {
      id: '1',
      name: 'razer',
      description: 'razer mouse gamer',
      image: Vengeance,
      price: 90,
      cardPrice: 100,
      parts: 42,
      quantity: 1,
      numInStock: 3,
    },
  ]);
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      zipcode: '80028922',
      neighborhood: 'paulista',
      street: 'av paulista',
    },
    {
      id: '2',
      zipcode: '04689160',
      neighborhood: 'vila isa',
      street: 'Rua quararibéia',
    },
  ]);
  const [cards, setCards] = useState([
    {
      id: '1',
      number: '35423343252',
      expiration: '11/25',
      cvv: '977',
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cardNumberInput = useRef<HTMLInputElement>(null);
  const cardExpirationInput = useRef<HTMLInputElement>(null);
  const cardCVVInput = useRef<HTMLInputElement>(null);

  const [paymentMode, setPaymentMode] = useState<'card' | 'cash'>('card');

  const [shipping, setShipping] = useState(0);

  const handleAddCoupon = useCallback(
    async (coupon: string) => {
      // hit the api to check coupon
      const [checkCouponResponse, couponError] = await promise<Coupon>(() =>
        api.post<z.infer<typeof couponValidator>>('/coupons/check', {
          coupon,
        })
      );

      if (couponError || !checkCouponResponse) {
        console.log('check coupon request failed');
        return;
      }

      const [isCouponValid, couponValidError] = await promise(() => couponValidator.parseAsync(checkCouponResponse));

      if (couponValidError || !isCouponValid) {
        alert('coupon doesnt exist');
        return;
      }

      const couponAlreadyInUse = coupons.find((coupon) => coupon.id === isCouponValid.id);

      if (couponAlreadyInUse) {
        alert('already in use');
        return;
      }

      setCoupons((coupons) => [isCouponValid, ...coupons]);

      setCurrentCoupon('');
    },
    [coupons]
  );

  const totalCouponPrice = useMemo(() => {
    const priceMap = coupons.map(({ value }) => value);

    return priceMap.reduce((accumulator, current) => accumulator + current, 0);
  }, [coupons]);

  const increaseItemQuantity = useCallback(
    (itemId: string) => {
      const item = cart.find((item) => item.id === itemId);
      // check number of items in stock

      if (!item) {
        return;
      }

      setCart((cart) => [...cart.filter(({ id }) => id !== itemId), { ...item, quantity: item.quantity + 1 }]);
    },
    [cart]
  );

  const decreaseItemQuantity = useCallback(
    (itemId: string) => {
      const item = cart.find((item) => item.id === itemId);

      if (!item) {
        return;
      }

      setCart((cart) => [...cart.filter(({ id }) => id !== itemId), { ...item, quantity: item.quantity - 1 }]);
    },
    [cart]
  );

  const removeItemFromCart = useCallback((itemId: string) => {
    setCart((cart) => cart.filter((item) => item.id !== itemId));
  }, []);

  const total = useMemo(() => {
    return {
      rawCardPrice: cart
        .map(({ cardPrice, quantity }) => cardPrice * quantity)
        .reduce((accumulator, current) => accumulator + current, 0),
      rawNowPrice: cart
        .map(({ price, quantity }) => price * quantity)
        .reduce((accumulator, current) => accumulator + current, 0),
      card: Math.max(
        cart
          .map(({ cardPrice, quantity }) => cardPrice * quantity)
          .reduce((accumulator, current) => accumulator + current, 0) +
          shipping -
          totalCouponPrice,
        0
      ),
      now: Math.max(
        cart.map(({ price, quantity }) => price * quantity).reduce((accumulator, current) => accumulator + current, 0) +
          shipping -
          totalCouponPrice,
        0
      ),
    };
  }, [cart, shipping, totalCouponPrice]);

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

      {step === 0 &&
        cart.map(({ id, name, description, price, image, parts, quantity, numInStock }) => (
          <section key={id} className="checkout--content checkout1--products--wrapper">
            <img src={image} alt="" className="checkout1--image" />

            <div className="checkout1--details">
              <h2 className="checkout1--title--h2">{name}</h2>
              <p className="checkout1--title--h2">{description}</p>
            </div>

            <div className="checkout1--quantity">
              <button
                style={{ width: '30px', height: '30px', margin: 0 }}
                disabled={quantity === numInStock}
                onClick={() => increaseItemQuantity(id)}
                className="checkout1--button"
              >
                +
              </button>

              <div>{quantity}</div>

              <button
                style={{ width: '30px', height: '30px', margin: 0 }}
                disabled={quantity <= 1}
                onClick={() => decreaseItemQuantity(id)}
                className="checkout1--button"
              >
                -
              </button>
            </div>

            <div className="checkout1--prices">
              <h2 className="checkout1--price">R$ {price.toFixed(2)}</h2>
              <h2 className="checkout1--price--alt">
                {parts}X de R$ {(price / parts).toFixed(2)} s/juros
              </h2>
            </div>

            <button onClick={() => removeItemFromCart(id)} className="checkout1--button">
              x
            </button>
          </section>
        ))}

      {step === 1 && (
        <section className="checkout--content checkout2--location--wrapper">
          <div className="checkout2--title--wrapper">
            <h2 className="checkout2--title--h2">Selecione Uma Localização</h2>
            <h2 onClick={() => addressModal.current?.handleOpenModal()} className="checkout2--title--h2 add--address">
              + Adicionar Localização
            </h2>
          </div>

          {addresses.map(({ id, zipcode, street, neighborhood }, index) => (
            <React.Fragment key={id}>
              <div
                onClick={() => {
                  setSelectedAddress(id);
                  setCanProceed(true);
                  console.log('calculate shipping');
                }}
                style={
                  selectedAddress === id
                    ? { borderColor: 'var(--clr-accent-200)' }
                    : { borderColor: 'var(--clr-gray-scale-700)' }
                }
                className="checkout2--address--wrapper"
              >
                <div className="checkout2--address">
                  <h2 className="checkout2--address--h2 sending--info">Endereço #{index + 1}</h2>
                  <h2 className="checkout2--address--h2">Rua: {street}</h2>
                  <h3 className="checkout2--address--h3">Bairro: {neighborhood}</h3>
                  <p className="checkout2--address--zipcode">Cep: {zipcode}</p>
                </div>

                <img src={PackageArrived} alt="" className="checkout2--image" />
              </div>

              <button
                onClick={() => {
                  if (selectedAddress === id) {
                    setCanProceed(false);
                    setShipping(0);
                    setSelectedAddress(null);
                  }

                  setAddresses((addresses) => addresses.filter((address) => address.id !== id));
                }}
              >
                X
              </button>
            </React.Fragment>
          ))}

          <Modal visible={false} ref={addressModal}>
            <CreateAddress
              onSubmit={({ zipcode, street, neighborhood }) => {
                // check if address already exists
                const addressAlreadyExists = addresses.find(
                  (address) =>
                    address.neighborhood === neighborhood || address.street === street || address.zipcode === zipcode
                );

                if (addressAlreadyExists) {
                  // set error
                  alert('address already exists.');
                  return;
                }

                setAddresses((addresses) => [
                  ...addresses,
                  {
                    id: (addresses.length + 1).toString(),
                    zipcode,
                    street,
                    neighborhood,
                  },
                ]);

                addressModal.current?.handleCloseModal();
              }}
            />
          </Modal>
        </section>
      )}

      {step === 2 && (
        <section className="checkout--content checkout3--payment--wrapper">
          <div className="checkout3--payment--options">
            <h2 onClick={() => setPaymentMode('card')} className="checkout3--payment--title checkoutCard">
              Cartão
            </h2>
            <h2 onClick={() => setPaymentMode('cash')} className="checkout3--payment--title checkoutPix">
              PIX
            </h2>
          </div>

          {paymentMode === 'card' && (
            <React.Fragment>
              {cards.map(({ id, number, expiration, cvv }, index) => (
                <label htmlFor={id} key={id} className="checkout3--payment--credit checkoutDivCard">
                  <div className="checkout3--payment--credit--title">
                    <input
                      id={id}
                      checked={selectedCard === id}
                      onChange={() => {
                        setCanProceed(true);
                        setSelectedCard(id);
                      }}
                      type="radio"
                      name="card"
                      className="checkout3--payment--radio"
                    />
                    <h2 className="checkout3--payment--h2">Cartão #{index + 1}</h2>
                  </div>

                  <div className="checkout3--payment--inputs">
                    <input
                      disabled
                      placeholder="Número Do Cartão"
                      value={number}
                      type="text"
                      className="checkout3--payment--number"
                    />

                    <div className="checkout3--payment--inputs--extras">
                      <input
                        disabled
                        placeholder="Data De Expiração"
                        value={expiration}
                        type="text"
                        className="checkout3--payment--number"
                      />

                      <input
                        disabled
                        placeholder="CVV"
                        type="text"
                        value={cvv}
                        className="checkout3--payment--number"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedCard === id) {
                        setCanProceed(false);
                        setSelectedCard(null);
                      }

                      setCards((cards) => cards.filter((card) => card.id !== id));
                    }}
                  >
                    x
                  </button>
                </label>
              ))}

              <label className="checkout3--payment--credit checkoutDivCard">
                <div className="checkout3--payment--credit--title">
                  <input type="radio" name="card" className="checkout3--payment--radio" />
                  <h2 className="checkout3--payment--h2">Crédito Ou Débito</h2>
                </div>

                <div className="checkout3--payment--inputs">
                  <input
                    placeholder="Número Do Cartão"
                    type="text"
                    ref={cardNumberInput}
                    className="checkout3--payment--number"
                  />

                  <div className="checkout3--payment--inputs--extras">
                    <input
                      placeholder="Data De Expiração"
                      type="text"
                      ref={cardExpirationInput}
                      className="checkout3--payment--number"
                    />

                    <input placeholder="CVV" type="text" ref={cardCVVInput} className="checkout3--payment--number" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCards((cards) => [
                      ...cards,
                      {
                        id: (cards.length + 1).toString(),
                        cvv: cardCVVInput.current?.value || '',
                        expiration: cardExpirationInput.current?.value || '',
                        number: cardNumberInput.current?.value || '',
                      },
                    ]);

                    // only runs after the stack is empty
                    queueMicrotask(() => {
                      if (cardCVVInput.current && cardNumberInput.current && cardExpirationInput.current) {
                        cardCVVInput.current.value = '';
                        cardNumberInput.current.value = '';
                        cardExpirationInput.current.value = '';
                      }
                    });

                    setSelectedCard(String(cards.length + 1));
                    setCanProceed(true);
                  }}
                >
                  add+
                </button>
              </label>
            </React.Fragment>
          )}

          {paymentMode === 'cash' && (
            <div style={{ display: 'flex' }} className="checkout3--payment--pix checkoutDivPix">
              <AiOutlineQrcode size={192} className="chehckout3--payment--image" />
              <h2 className="checkout3--payment--h2">PIX</h2>

              <button className="checkout3--button--pix">Gerar Pix</button>
            </div>
          )}
        </section>
      )}

      <aside className="checkout--info">
        <div className="checkout--info--wrapper">
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleAddCoupon(currentCoupon);
            }}
            className="checkout--zip"
          >
            <input
              type="text"
              className="checkout--info--input"
              value={currentCoupon}
              onChange={(event) => setCurrentCoupon(event.target.value)}
            />

            <button className="checkout--info--button">Aplicar</button>

            <FiTag size={20} className="checkout--input--image" />
          </form>

          <div className="checkout--info--values">
            <h3 className="checkout--info--h3">
              Subtotal{' '}
              <span className="checkout--discount">
                R${' '}
                {cart
                  .map(({ price, quantity }) => price * quantity)
                  .reduce((accumulator, current) => accumulator + current, 0)
                  .toFixed(2)}
              </span>
            </h3>
            <h4 className="checkout--info--h4">
              Frete <span className="checkout--discount">R$ {shipping.toFixed(2)}</span>
            </h4>

            <hr className="checkout--info--hr" />

            <h4 className="checkout--info--h4">
              {coupons.map((coupon) => (
                <div key={coupon.id}>
                  <button
                    onClick={() => setCoupons((coupons) => coupons.filter((_coupon) => _coupon.id !== coupon.id))}
                  >
                    x
                  </button>
                  {coupon.name}: R$ {coupon.value.toFixed(2)}
                </div>
              ))}
              Cupons de Disconto: <span className="checkout--discount">R$ {totalCouponPrice.toFixed(2)}</span>
            </h4>

            <hr className="checkout--info--hr" />

            <div className="checkout--total--wrapper">
              <h2 className="checkout--info--h2">TOTAL</h2>{' '}
              <h2 className="checkout--info--h2 checkout--total">R$ {total.now.toFixed(2)}</h2>
            </div>
          </div>

          <div className="checkout--info--method--wrapper">
            <div className="checkout--info--payment">
              <img src={ShoppingCart} alt="" className="checkout--info--payment--image" />
              <h2 className="checkout--info--h2">R$ {total.card.toFixed(2)}</h2>
            </div>

            <h3 className="checkout--info--payment--desc">
              {parts}x de R$ {round(total.card / parts, 0.5).toFixed(2)} s/juros no cartão
            </h3>
          </div>
          <div className="checkout--info--method--wrapper">
            <div className="checkout--info--payment">
              <AiOutlineQrcode size={50} className="checkout--info--payment--image" />
              <h2 className="checkout--info--h2">R$ {total.now.toFixed(2)}</h2>
            </div>

            <h3 className="checkout--info--payment--desc">
              {Math.round(100 - findPercentageBetweenNumbers(total.rawNowPrice, total.rawCardPrice))}% de desconto à
              vista
            </h3>
            <p>pix ou boleto</p>
          </div>

          <button
            disabled={step <= 0}
            style={step <= 0 ? { opacity: '50%' } : {}}
            onClick={() => setStep((step) => step - 1)}
            className="checkout--info--submit"
          >
            Voltar
          </button>

          <button
            disabled={!canProceed}
            style={!canProceed ? { opacity: '50%' } : {}}
            onClick={() => {
              if (step === 0 && !selectedAddress) {
                setCanProceed(false);
              }

              if (step >= 2) {
                // thats it
                alert('compra feita, redirecionando para página principal');
                navigate('/');
                return;
              }

              setStep((step) => step + 1);
            }}
            className="checkout--info--submit"
          >
            {step >= 2 ? 'Comprar' : 'Próximo'}
          </button>
        </div>
      </aside>
    </div>
  );
}
