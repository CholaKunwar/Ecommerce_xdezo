import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import CartTotal from '../Components/CartTotal';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
	const [method, setMethod] = useState('cod');
	const { navigate, getCartAmount, delivery_fee } = useContext(ShopContext);

	let grandTotal = getCartAmount() + delivery_fee;
	console.log('grandTotal: ', grandTotal)
	let [formData, setFormData] = useState({
		amount: grandTotal,
		tax_amount: "0",
		total_amount: grandTotal,
		transaction_uuid: uuidv4(),
		product_service_charge: "0",
		product_delivery_charge: "0",
		product_code: "EPAYTEST",
		success_url: "http://localhost:5173/paymentsuccess",
		failure_url: "http://localhost:5173/paymentfailure",
		signed_field_names: "total_amount,transaction_uuid,product_code",
		signature: "",
		secret: "8gBm/:&EnhH.1/q",
	})

	//generate hash function
	const generateSignature = (
		total_amount, transaction_uuid, product_code, secret
	) => {
		const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
		const hash = CryptoJS.HmacSHA256(hashString, secret);
		const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
		return hashedSignature;
	}

	// Update formData when grandTotal changes. yo nagare tei initial value 100 matra dekhauxa
	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			amount: grandTotal,
			total_amount: grandTotal,
		}));
	}, [grandTotal]);

	useEffect(() => {
		const { total_amount, transaction_uuid, product_code, secret } = formData; //destructuring
		const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
		console.log(hashedSignature)
		setFormData({ ...formData, signature: hashedSignature })
	}, [formData.amount]); //formData ko amount change hune bittikai naya signature banauna ko lagi

	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className='flex flex-col sm:flex-row justify-evenly gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300'>
				{/* left side */}
				<div className=' my-3 gap-3 pe-24 pt-14'>			
					<h1 className='text-xl sm:text-2xl text-gray-500 uppercase'>Delivery <span className='text-black ps-2'> Information</span></h1>
					<div className="flex gap-3 pt-5">
						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus: outline-gray-300' type='text' placeholder='First Name'></input>
						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="text" placeholder='Last Name' />
					</div>
					<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300 my-3' type="email" placeholder='Email' />

					<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300 mb-3' type="text" placeholder='Street' />

					<div className="flex gap-3">
						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="text" placeholder='City' />

						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="text" placeholder='State' />
					</div>

					<div className="flex gap-3 my-3">
						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="number" placeholder='Zipcode' />

						<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="text" placeholder='Country' />
					</div>

					<input className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-gray-300' type="number" placeholder='Phone no.' />
				</div>

				{/* Right Side */}
				<div className="">
					<div className="mt-8 min-w-80">
						<CartTotal />
					</div>

					<div className="mt-18">
						<h1 className='text-xl text-start sm:text-2xl text-gray-500 uppercase'>payment <span className='text-black ps-2'> Method</span></h1>

						{/* Payment method */}
						<div className="flex gap-3 flex-col lg:flex-row">
							<div onClick={() => setMethod('esewa')} className='flex items-center gap-3 border border-gray-300 px-5 mt-5 cursor-pointer'>
								<p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'esewa' ? 'bg-lime-300' : ''}`}></p>
								<img src="https://hamronepalcoop.com.np/wp-content/uploads/2022/03/featured.png" alt="esewa" className='h-8 w-24 mx-2' />
							</div>

							<div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 px-2 py-4 mt-5 cursor-pointer'>
								<p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-lime-300' : ''}`}></p>
								<p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
							</div>
						</div>
					</div>

					{method === 'esewa' ?
						<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
							<input type="hidden" id="amount" name="amount" value={formData.amount} required />
							<input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} required />
							<input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
							<input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
							<input type="hidden" id="product_code" name="product_code" value={formData.product_code} required />
							<input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
							<input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
							<input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
							<input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} required />
							<input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
							<input type="hidden" id="signature" name="signature" value={formData.signature} required />
							<button type="submit" className="focus:outline-none mt-10 w-full hidden-white bg-gray-800 hover:bg-gray-900 outline-0 font-semibold hidden-sm px-5 py-2.5 text-white text-lg tracking-widest shadow-lg ">Proceed to checkout</button>
						</form>
						:
						<Link to={'/paymentSuccess'}>
							<button type="submit" className="focus:outline-none mt-10 w-full hidden-white bg-gray-800 hover:bg-gray-900 outline-0 font-semibold hidden-sm px-5 py-2.5 text-white text-lg tracking-widest shadow-lg ">Proceed to checkout</button>
						</Link>
							}	
				</div>
			</div>
		</div>
	)
}

export default PlaceOrder