import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { FaExclamationCircle, FaUser } from "react-icons/fa";

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
	const currency = 'Rs.';
	const delivery_fee = 100;
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const navigate = useNavigate();
	const { user } = useUser();


	// Load cart data from local storage on mount
	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCartItems(JSON.parse(savedCart));
		}
	}, []);

	// Save cart data to local storage whenever cartItems change
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	// Function to clear the cart after payment
	const clearCart = () => {
		setCartItems({}); // Reset cart state
		localStorage.removeItem("cart"); // Remove cart from localStorage
		toast.success("Payment Successful! Your cart has been cleared.");
	};

	const addToCart = async (itemId, size) => {
		let cartData = structuredClone(cartItems);
		if(!user) {
			toast('Please Login for adding to cart', {
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				className: 'Toastify__toast--custom', // Apply custom class
				icon: (
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<FaUser style={{ color: '#ff4444', fontSize: '18px' }} /> {/* User icon */}
						{/* <FaExclamationCircle style={{ color: '#ff4444', fontSize: '18px' }} /> Error icon */}
					</div>
				),
			});
			return;
		}
		if (!size) {
			toast.error('Select Product Size', {
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				className: 'Toastify__toast--custom', // Apply custom class
				//  progressClassName: 'Toastify__progress-bar--custom', // Custom progress bar
			});
			return;
		}
		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}
		setCartItems(cartData);
		toast(<div className="text-center bg-gray-50">
			<svg
				className="mx-auto mb-1 text-green-500 w-14 h-12 ps-5"
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 13l4 4L19 7"
				/>
			</svg>
			<h3 className="mb-5 ps-5 text-lg font-normal text-gray-500">
				Item added to cart successfully!
			</h3>
			<button
				onClick={() => toast.dismiss()} // Close toast on click
				className="ms-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
			>
				Continue Shopping
			</button>
		</div>,
			{
				className: 'Toastify__toast--success-custom1', // Apply custom class
				progressClassName: 'Toastify__progress-bar--success-custom1', // Custom progress bar
				autoClose: 3000, // Auto-close after 3 seconds
				closeButton: true, // Hide default close button
			}
		);
	}

	const getCartCount = () => {
		let totalCount = 0;
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalCount += cartItems[items][item];
					}
				} catch (error) {
					toast.error(error.message);
				}
			}
		}
		return totalCount;
	}

	useEffect(() => {
		console.log(cartItems);
	})

	const updateQuantity = async (itemId, size, quantity) => {
		let cartData = structuredClone(cartItems);
		cartData[itemId][size] = quantity;
		setCartItems(cartData);
	}


	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItems) {
			let itemInfo = products.find((product) => product._id === items);
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalAmount += itemInfo.price * cartItems[items][item];
					}
				} catch (error) {
					alert(error.message);
				}
			}
		}
		return totalAmount;
	}
	const value = {
		products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate,clearCart
	}

	return (
		<ShopContext.Provider value={value}>
			{props.children}
		</ShopContext.Provider>
	)
}
export default ShopContextProvider;