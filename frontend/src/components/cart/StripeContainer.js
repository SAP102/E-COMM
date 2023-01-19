import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Payment from './Payment';

function StripeContainer() {

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApikey() {
    const { data } = await axios.get("/api/v1//stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(()=>{
    getStripeApikey()
  },[])
  return (
    <div className="App">
      {stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
      )}
    </div>
  );
}

export default StripeContainer;