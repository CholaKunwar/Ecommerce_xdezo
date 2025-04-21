import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import CartTotal from '../Components/CartTotal';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
	const [method, setMethod] = useState('cod');
	const { products, getCartAmount, cartItems, delivery_fee } = useContext(ShopContext);
	const [cartData, setCartData] = useState([]);

	useEffect(() => {
		const tempData = [];
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				if (cartItems[items][item] > 0) {
					tempData.push({
						_id: items,
						size: item,
						quantity: cartItems[items][item],
					});
				}
			}
		}
		setCartData(tempData);
	}, [cartItems]);

	const proceedToCheckout = () => {
		// Retrieve existing purchase history from localStorage or initialize an empty array
		let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

		// Create a new purchase object with all necessary details
		const newPurchase = {
			id: uuidv4(), // Unique ID for the purchase
			date: new Date().toISOString(), // Timestamp of purchase
			paymentMethod: method,
			totalAmount: grandTotal,
			deliveryInfo: { ...deliveryInfo }, // Store delivery details
			items: cartData.map((item) => {
				const productData = products.find((product) => product._id === item._id);
				return productData
					? {
						productId: productData._id,
						name: productData.name, // Include product name for reference
						quantity: item.quantity,
						size: item.size,
					}
					: null;
			}).filter(Boolean) // Remove any null values
		};

		// Add new purchase object to the history
		purchaseHistory.push(newPurchase);

		// Store the updated purchase history in localStorage
		localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
	};



	let grandTotal = getCartAmount() + delivery_fee;
	let [formData, setFormData] = useState({
		amount: grandTotal,
		tax_amount: "0",
		total_amount: grandTotal,
		transaction_uuid: uuidv4(),
		product_service_charge: "0",
		product_delivery_charge: "0",
		product_code: "EPAYTEST",
		success_url: "https://ecommerce-xdezo.vercel.app/paymentsuccess",
		failure_url: "https://ecommerce-xdezo.vercel.app/paymentfailure",
		signed_field_names: "total_amount,transaction_uuid,product_code",
		signature: "",
		secret: "8gBm/:&EnhH.1/q",
	});

	const [deliveryInfo, setDeliveryInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		phone: "",
	});
	const [error, setError] = useState("");

	// Generate hash function
	const generateSignature = (
		total_amount, transaction_uuid, product_code, secret
	) => {
		const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
		const hash = CryptoJS.HmacSHA256(hashString, secret);
		const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
		return hashedSignature;
	};

	// Update formData when grandTotal changes
	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			amount: grandTotal,
			total_amount: grandTotal,
		}));
	}, [grandTotal]);

	useEffect(() => {
		const { total_amount, transaction_uuid, product_code, secret } = formData;
		const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
		setFormData({ ...formData, signature: hashedSignature });
	}, [formData.amount]);

	const handleProceedToCheckout = (e) => {
		// Check if all delivery info fields are filled
		const { firstName, lastName, email, street, city, state, zipcode, country, phone } = deliveryInfo;

		if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone) {
			e.preventDefault(); // Prevent form submission
			setError("Please fill in all delivery information before proceeding to checkout.");
			scrollTo(0, 0);
			return;
		} else {
			proceedToCheckout();
		}
	};

	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className='flex flex-col sm:flex-row justify-evenly gap-4 pt-5 sm:pt-14 min-h-[80vh]'>

				{/* Left Side - Delivery Info */}
				<div className='my-3 gap-6 p-8 bg-white rounded-md shadow-sm'>
					<h1 className='text-2xl font-semibold text-gray-800'>Delivery Information</h1>

					{/* Delivery Form Fields */}
					<div className="pt-5">
						<div className="flex gap-4">
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type='text' placeholder='First Name' value={deliveryInfo.firstName} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })} required />
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type="text" placeholder='Last Name' value={deliveryInfo.lastName} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })} required />
						</div>
						<input className='border border-gray-300 rounded-lg py-2 px-4 w-full mt-4' type="email" placeholder='Email' value={deliveryInfo.email} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })} required />

						<input className='border border-gray-300 rounded-lg py-2 px-4 w-full mt-4' type="text" placeholder='Region/District/City' value={deliveryInfo.street} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, street: e.target.value })} required />

						<div className="flex gap-4 mt-4">
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type="text" placeholder='House no/building/street/area' value={deliveryInfo.city} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })} required />
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type="text" placeholder='Province' value={deliveryInfo.state} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })} required />
						</div>

						<div className="flex gap-4 mt-4">
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type="number" placeholder='Zipcode' value={deliveryInfo.zipcode} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipcode: e.target.value })} required />
							<input className='border border-gray-300 rounded-lg py-2 px-4 w-full' type="text" placeholder='Country' value={deliveryInfo.country} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, country: e.target.value })} required />
						</div>

						<input className='border border-gray-300 rounded-lg py-2 px-4 w-full mt-4' type="number" placeholder='Phone no.' value={deliveryInfo.phone} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} required />
					</div>

					{/* Display error if delivery info is incomplete */}
					{error && <div className="text-red-600 mt-2">{error}</div>}
				</div>

				{/* Right Side - Cart Total & Payment Method */}
				<div className="w-full max-w-lg">

					<CartTotal />

					<h1 className='text-2xl font-semibold text-gray-800 mt-10'>Payment Method</h1>

					{/* Payment Method Selection */}
					<div className="flex gap-4 mt-8">
						<div onClick={() => setMethod('esewa')} className={`flex items-center gap-2 py-4 px-[53px] rounded-md border cursor-pointer transition-all ease-in-out duration-300 ${method === 'esewa' ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-blue-100'}`}>
							<img src="https://hamronepalcoop.com.np/wp-content/uploads/2022/03/featured.png" alt="esewa" className='h-8 w-30' />
						</div>

						<div onClick={() => setMethod('cod')} className={`flex items-center gap-2 py-4 px-[53px] rounded-md border cursor-pointer transition-all ease-in-out duration-300 ${method === 'cod' ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-blue-100'}`}>
							<p className='text-gray-600 text-lg'>Cash on Delivery</p>
						</div>
					</div>

					{/* Submit Button */}
					{method === 'esewa' ?
						<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" onSubmit={handleProceedToCheckout}>
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
							<button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all ease-in-out duration-300">Proceed to Checkout</button>
						</form>
						:
						<Link to={'/paymentsuccess'}>
							<button type="submit" onClick={handleProceedToCheckout} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all ease-in-out duration-300">Proceed to Checkout</button>
						</Link>
					}
				</div>
			</div>
		</div>
	)
}

export default PlaceOrder;
