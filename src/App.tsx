import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)
const handleSuccess = () => {
  mySwal.fire({
    icon: 'success',
    title: 'Payment success',
    timer:4000
  })
}
const handleFail = () => {
  mySwal.fire({
    icon: 'error',
    title: 'Payment fail',
    timer:4000
  })
}
function App() {
	const [price, setPrice] = useState('');
	const payNow = async (token: any) => {
		try {
			const response = await axios({
				url: 'http://localhost:5000/payment',
				method: 'post',
				data: {
					amount: Number(price) *100,
					token,
				},
      });
      if (response.status === 200) {
        handleSuccess()
        console.log('Payment successfull');
      }
      
    } catch (error) {
      handleFail()
			console.log(error);
		}
	};
	return (
		<>
			<input
				type="number"
				value={Number(price)}
				onChange={(e) => setPrice(e.target.value)}
			/>
			<StripeCheckout
				stripeKey="pk_test_51NFYv4Dzb5bpgoMI54j1A3U2DVcWSLLxCw9ipQzdJu9nadFVErilfiRX1JYrLmEVu0B2l2YZEC9NqsXPAxrhsbOv00rrSeKsgt"
				label="Pay Now"
				name="Pay with credit card"
				billingAddress
				shippingAddress
				amount={Number(price)*100}
				description={`Your total is $${price}`}
				token={payNow}
			/>
		</>
	);
}

export default App;
