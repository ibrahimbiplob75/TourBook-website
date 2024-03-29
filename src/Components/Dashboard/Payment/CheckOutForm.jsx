import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../../AxiosSecure/UseAxiosSecure"
import { AuthProvider } from "../../../ContextProvider/ContextProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {
    const stripe=useStripe();
    const elements=useElements();
    const [axiosSecure]=UseAxiosSecure();
    const {user}=useContext(AuthProvider);
    const [clientSecret, setSecret] = useState("");
    const [TransactionId,setTransactionId]=useState("")
    const navigate=useNavigate();
    const price=500;

    useEffect(()=>{
      if(price>0){
         axiosSecure.post("/create-payment-intent", { price }).then((res) => {
           console.log(res.data.clientSecret);
           setSecret(res.data.clientSecret);
         });
      }
     ;
    },[axiosSecure,price]);

    const handleSubmit=async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);

        if(card===null){
            return;
        }

        const {error} = await stripe.createPaymentMethod({
          type: "card",
          card
        });

        if(error){
            console.log('[error]', error);
            } 
        

        const { paymentIntent, err } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || "unknown",
                name: user?.displayName || "anonymous",
              },
            },
          }  
        );
        
        if(err){
          console.log("Intend",err);
        }
        
        console.log("Payment intend", paymentIntent);
        if(paymentIntent.status==="succeeded"){
          setTransactionId(paymentIntent.id);
          const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            price,
            date: new Date(),
            status: "Paid Membership ",
          };



          const res = await axiosSecure.post("/payments", payment)
          .then((res) => {
            console.log(res)
            if (res?.data?.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "payment successfull, check your Membership",
                showConfirmButton: false,
                timer: 2500,
              });
              navigate("/dashboard/profile");
            }
            
          });
        }
        

    }
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret}
          className="btn btn-accent w-1/3 my-7"
          type="submit"
          
        >
          Pay
        </button>
      </form>
    );
};

export default CheckOutForm;