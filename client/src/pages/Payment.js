import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

export const Payment = () => {
   const [stripeToken, setStripeToken] = useState(null)
   const navigate = useNavigate();
   const onToken = (token) => {
      setStripeToken(token)
   }

   useEffect(() => {
      const makeRequest = async () => {
         try {
            const res = await fetch('http://localhost:5010/api/checkout/payment', {
               method: 'POST',
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(
                  {
                     tokenId: stripeToken.id,
                     amount: 2000,
                  }
               )
            })
            const result = await res.json()
            console.log(result);
            navigate('/success');
         } catch (error) {
            console.log(error);
         }

      }

      stripeToken && makeRequest()
   }, [stripeToken, navigate])
   return (
      <div className='payment'>
         <StripeCheckout
            name='TedShop.com'
            image='https://cdn-icons.flaticon.com/png/128/4357/premium/4357163.png?token=exp=1641682292~hmac=9345d68ec9ebae2c03282ae74d512a81'
            billingAddress
            shippingAddress
            description='Your total is $20.00'
            amount={2000}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
         >

            <button>Complete payment</button>
         </StripeCheckout>
      </div>
   )
}
