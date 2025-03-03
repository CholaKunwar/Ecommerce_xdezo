import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png'

const Order = () => {
	const { products, currency, cartItems, navigate } = useContext(ShopContext);
	const [cartData, setCartData] = useState([]);

	// Retrieve product details from localStorage
	const storedProductDetails = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

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


	//function to handle deletion
	const handleDeleteOrder = (orderId) => {
		const updatedOrders = storedProductDetails.filter((item) => item.id != orderId);
		localStorage.setItem('productDetails', JSON.stringify(updatedOrders));
		setCartData(updatedOrders);
	};


	//function to handle receipt download
	const handleDownloadReceipt = (order, productData) => {
		const doc = new jsPDF();

		// Set Global Styling
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(16);

		// Add a Company Logo (Replace with your logo URL)
		const logoUrl = logo;
		doc.addImage(logoUrl, 'PNG', 90, 8, 30, 25); // (x, y, width, height)

		// Title
		doc.setFontSize(18);
		doc.setTextColor(40, 40, 40);
		doc.text('Order Receipt', 105, 40, { align: 'center' });

		// Draw a separator line
		doc.setDrawColor(150, 150, 150);
		doc.line(10, 45, 200, 45); // (x1, y1, x2, y2)

		// Add product image (if available)
		const productImage = productData.image[0] || "https://via.placeholder.com/150"; 
		doc.addImage(productImage, 'JPEG', 12, 55, 50, 50); // Position and size of the image (x, y, width, height)

		// Order Details Section
		doc.setFontSize(12);
		doc.setFont('helvetica', 'normal');

		const startX = 70, startY = 55;
		const lineSpacing = 10;

		doc.text(`Order ID:`, startX, startY);
		doc.text(`${order.productId}`, startX + 40, startY);

		doc.text(`Product:`, startX, startY + lineSpacing);
		doc.text(`${productData.name}`, startX + 40, startY + lineSpacing);

		doc.text(`Size:`, startX, startY + 2 * lineSpacing);
		doc.text(`${order.size}`, startX + 40, startY + 2 * lineSpacing);

		doc.text(`Quantity:`, startX, startY + 3 * lineSpacing);
		doc.text(`${order.quantity}`, startX + 40, startY + 3 * lineSpacing);

		doc.text(`Total Price:`, startX, startY + 4 * lineSpacing);
		doc.text(`${currency}${(productData.price * order.quantity).toFixed(1)}`, startX + 40, startY + 4 * lineSpacing);

		doc.text(`Payment Method:`, startX, startY + 5 * lineSpacing);
		doc.text(`${order.paymentMethod}`, startX + 40, startY + 5 * lineSpacing);

		// Draw a border box around order details
		doc.setDrawColor(200, 200, 200);
		doc.setLineWidth(0.5);
		doc.rect(10, 50, 190, 65); // (x, y, width, height)

		// Add a Footer
		doc.setFontSize(12);
		doc.setTextColor(60, 60, 60);
		doc.text('Thank you for shopping with us!', 105, 130, { align: 'center' });

		// Save PDF
		doc.save(`receipt_${order.productId}.pdf`);
	};


	return (
		<>
			<div className="relative overflow-x-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
				<h1 className="text-rose-400 text-3xl font-semibold py-8">My Orders</h1>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border rounded-lg overflow-hidden shadow-md">
					<thead className="text-md text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-4 py-3">Product Image</th>
							<th scope="col" className="px-4 py-3 hidden md:block">Product Name</th>
							<th scope="col" className="ps-14 pe-4 md:px-4 py-3">Quantity</th>
							<th scope="col" className="px-4 py-3">Price</th>
							<th scope="col" className="px-4 py-3">Payment Method</th>
							<th scope="col" className="px-4 py-3 text-center">Order Status</th>
							<th scope="col" className="px-4 py-3 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{storedProductDetails.map((item, index) => {
							const productData = products.find((product) => product._id === item.productId);
							if (!productData) return null; // Handle missing product data

							return (
								<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-4 py-4">
										<div className="flex items-center gap-4">
											
											<img
												src={productData.image[0]} // Assuming the product image array exists
												className="w-16 sm:w-20 h-16 sm:h-20 rounded-md object-cover shadow"
												alt={productData.name}
											/>
											<div className="flex flex-col">
												<p className="text-lg font-medium text-gray-800 dark:text-white">{currency}{productData.price}</p>
												<span className="px-4 me-4 py-1 text-sm border border-gray-300 bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md">
													{item.size}
												</span>
											</div>
										</div>
									</td>
									<td className="px-4 py-4 font-medium text-lg hidden md:block text-gray-800 dark:text-white">
										{productData.name}
									</td>
									<td className="ps-20 pe-8 md:px-4 py-4 text-center text-lg font-semibold">{item.quantity}</td>

									<td className="px-4 py-4 text-lg font-semibold">
										{item.paymentMethod === 'cod' ?
											`${currency}${(productData.price * item.quantity).toFixed(1)}`
											:
											`${currency}${(productData.price * item.quantity + 100).toFixed(1)}`
										}
									</td>

									<td className="px-4 py-4 font-semibold">
										{item.paymentMethod === 'esewa' ?
											<div className={`w-fit py-2 px-2 rounded-md border cursor-pointer`}>
												<img src="https://hamronepalcoop.com.np/wp-content/uploads/2022/03/featured.png" alt="esewa" className='h-8 w-15' />
											</div> :
											<div className={`inline-flex items-center w-fit py-2 px-4 rounded-md border cursor-pointer`}>
												<p className='text-gray-600 text-xs'>Cash on <br></br>Delivery</p>
											</div>
										}
									</td>

									<td className="px-4 py-4 text-center">
										<span
											className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
												}`}
										>
											{item.quantity > 0 ? 'Shipped' : 'Cancelled'}
										</span>
									</td>

									{/* Action Buttons: Delete and Download Receipt */}
									<td className='px-4 pt-8 pb-4 text-start flex flex-col'>
										<button className='text-red-600 hover:text-red-800 underline pb-2' onClick={() => handleDeleteOrder(item.id)}>
											Delete order
										</button>

										<button className=' text-blue-600 hover:text-blue-800 underline' onClick={()=> handleDownloadReceipt(item, productData)}>Download Receipt</button>
									</td>

								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Order;
 