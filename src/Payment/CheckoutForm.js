import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/UserContext';


function CheckoutFrom() {
  const {user} = useContext(AuthContext)
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("")
     const stripe = useStripe()
     const elements = useElements()

     //subscription amount price
     const price = 2;

     useEffect(() =>{
        fetch("http://localhost:5000/create-payment-intent",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            // authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({price}),
        })  
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
     },[price])

     const handleSubmit = async(event) =>{
          event.preventDefault();
          if(!stripe || !elements){
               return
          }
          const card = elements.getElement(CardElement);
          if(card === null){
            return
          }

          const {error} = await stripe.createPaymentMethod({
             type: 'card',
             card
          });
          if(error){
            setCardError(error.message)
          }
          else{
            setCardError('');
          }
          //reset success
          setSuccess('');
          setProcessing(true);
          //card payment confirm
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName,
                  email: user?.email
                },
              },
            },
          );
          if(confirmError){
            setCardError(confirmError.message);
            return;
          }
          if(paymentIntent.status === "succeeded"){
            
            const payment ={
               price,
               transactionId:paymentIntent.id,
               email: user?.email
            }
            fetch('http://localhost:5000/payments', {
              method: 'POST',
              headers:{
                'content-type' : 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
               if(data.insertedId){
                setSuccess('Congrats! your payment completed');
                setTransactionId(paymentIntent.id);
                toast.success('payment Successful')
                event.reset()
               }
            })
            
          }
          setProcessing(false);
          console.log(paymentIntent)
     }
  return (
    <>
         <form onSubmit={handleSubmit}>
     <CardElement
       options={{
         style: {
           base: {
             fontSize: '16px',
             color: '#424770',
             '::placeholder': {
               color: '#aab7c4',
             },
           },
           invalid: {
             color: '#9e2146',
           },
         },
       }}
     />
     <button className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
       Pay
     </button>
   </form>
   <p className="text-red-500">{cardError}</p>
   {
     success && <div>
      <p className='text-green-500'>{success}</p>
      <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
     </div>
   }
    </>
  )
}

export default CheckoutFrom