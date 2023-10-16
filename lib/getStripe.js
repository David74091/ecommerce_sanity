import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  console.log("執行有進來");
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;
