import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,  currency: "USD"  }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          console.log("Final PayPal amount sent:", amount, typeof amount);
          const fixedAmount = Number(amount).toFixed(2).toString();
          console.log("PayPal amount:", fixedAmount);

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: fixedAmount, // ✅ Proper string format
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
