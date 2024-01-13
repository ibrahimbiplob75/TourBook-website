import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Element } from 'html-react-parser';

import { Elements } from '@stripe/react-stripe-js';

//To do Login in Stripe and there we will find a publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
    return (
      <div>
        <SectionTitle
          subTitle={"Please Make Payment"}
          title={"Thanks for come"}
        ></SectionTitle>
        <div>
          <Elements stripe={stripePromise}>
                {/* <CheckOutForm></CheckOutForm> */}
          </Elements>
        </div>
      </div>
    );
};

export default Payment;