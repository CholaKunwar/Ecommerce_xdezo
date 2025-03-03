import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import logo from '../assets/logo.png';
import { FaDownload, FaTrash } from "react-icons/fa";

const Order2 = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const storedOrders = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
		setOrders(storedOrders);
	}, []);

	const handleDeleteOrder = (orderId) => {
		const updatedOrders = orders.filter((order) => order.id !== orderId);
		localStorage.setItem('purchaseHistory', JSON.stringify(updatedOrders));
		setOrders(updatedOrders);
	};

	const handleDownloadPDF = (order) => {
		const doc = new jsPDF();

		// Add logo
		doc.addImage(logo, 'PNG', 90, 8, 30, 25);

		// Title of the document
		doc.setFontSize(22);
		doc.setTextColor(40, 40, 40);
		doc.text('Order Receipt', 105, 40, { align: 'center' });

		// Add separator line
		doc.setDrawColor(150, 150, 150);
		doc.line(10, 45, 200, 45);

		// Set font and size for details
		doc.setFontSize(12);
		doc.setFont('helvetica', 'normal');

		const startX = 20, startY = 55;
		const lineSpacing = 10;

		// Order ID and Date (Header Section)
		doc.setFontSize(14);
		doc.text(`Order ID:`, startX, startY);
		doc.setFontSize(12);
		doc.text(`${order.id}`, startX + 50, startY);

		doc.setFontSize(14);
		doc.text(`Date:`, startX, startY + lineSpacing);
		doc.setFontSize(12);
		doc.text(new Date(order.date).toLocaleString(), startX + 50, startY + lineSpacing);

		// Separator Line
		doc.setDrawColor(150, 150, 150);
		doc.line(10, startY + 3 * lineSpacing, 200, startY + 3 * lineSpacing);

		// Total Amount Section
		doc.setFontSize(14);
		doc.text('Total Amount:', startX, startY + 4 * lineSpacing);
		doc.setFontSize(12);
		doc.text(`Rs. ${order.totalAmount}`, startX + 50, startY + 4 * lineSpacing);

		// Customer Information Section
		doc.setFontSize(14);
		doc.text('Customer Information:', startX, startY + 6 * lineSpacing);
		doc.setFontSize(12);
		doc.text(`Name: ${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`, startX, startY + 7 * lineSpacing);
		doc.text(`Email: ${order.deliveryInfo.email}`, startX, startY + 8 * lineSpacing);
		doc.text(`Phone: ${order.deliveryInfo.phone}`, startX, startY + 9 * lineSpacing);
		doc.text(`Address: ${order.deliveryInfo.street}, ${order.deliveryInfo.city}, ${order.deliveryInfo.zipcode}`, startX, startY + 10 * lineSpacing);

		// Payment Method Section
		doc.setFontSize(14);
		doc.text('Payment Method:', startX, startY + 12 * lineSpacing);
		doc.setFontSize(12);
		doc.text(`${order.paymentMethod}`, startX + 50, startY + 12 * lineSpacing);

		// Separator Line
		doc.setDrawColor(150, 150, 150);
		doc.line(10, startY + 14 * lineSpacing, 200, startY + 14 * lineSpacing);

		// Product Items Section
		doc.setFontSize(14);
		doc.text('Ordered Items:', startX, startY + 15 * lineSpacing);
		order.items.forEach((item, idx) => {
			doc.setFontSize(12);
			doc.text(`${item.name} (Size: ${item.size}) - Quantity: ${item.quantity}`, startX, startY + (16+ idx) * lineSpacing);
		});

		// Footer
		doc.setFontSize(12);
		doc.setTextColor(60, 60, 60);
		doc.text('Thank you for shopping with us!', 105, 260, { align: 'center' });

		// Save the PDF
		doc.save(`receipt_${order.id}.pdf`);
	};



	return (
		<div className=" px-4 sm:px-6 py-12">
			<div className="max-w-[1340px] mx-auto">
				<h2 className="text-4xl font-bold mb-4 text-rose-400">
					Order Details
				</h2>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
								<tr>
									<th className="p-4 text-sm font-medium text-left">Order ID</th>
									<th className="p-4 text-sm font-medium text-left">Date & Time</th>
									<th className="p-4 text-sm font-medium text-left">Payment</th>
									<th className="p-4 text-sm font-medium text-left">Customer</th>
									<th className="p-4 text-sm font-medium text-left hidden md:table-cell">Items</th>
									<th className="p-4 text-sm font-medium text-left">Total</th>
									<th className="p-4 text-sm font-medium text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{orders.length > 0 ? (
									orders.map((order, index) => (
										<tr
											key={index}
											className="hover:bg-gray-50 transition-all duration-200"
										>
											<td className="p-4 text-sm font-medium text-gray-900">{order.id}</td>
											<td className="p-4 text-sm text-gray-600">
												{new Date(order.date).toLocaleString()}
											</td>
											<td className="p-4">
												{order.paymentMethod === 'esewa' ?
													<div className={`w-fit py-2 px-2 rounded-md border cursor-pointer`}>
														<img src="https://hamronepalcoop.com.np/wp-content/uploads/2022/03/featured.png" alt="esewa" className='h-8 w-15' />
													</div> :
													<div className={`inline-flex items-center w-fit py-2 px-4 rounded-md border cursor-pointer`}>
														<p className='text-gray-600 text-xs'>Cash on <br></br>Delivery</p>
													</div>
												}
											</td>
											<td className="p-4 text-sm text-gray-600 tracking-tight">
												{order.deliveryInfo?.firstName} {order.deliveryInfo?.lastName}
											</td>
											<td className="p-4 text-sm text-gray-600 hidden md:table-cell">
												{order.items.map((item, idx) => (
													<div key={idx} className="mb-2 last:mb-0">
														<span className="font-medium">{item.name}</span>
														<span className="text-gray-500"> ({item.size}) - {item.quantity}</span>
													</div>
												))}
											</td>
											<td className="p-4 text-sm font-medium text-rose-600">
												Rs. {order.totalAmount}
											</td>
											<td className="p-4">
												<div className="flex flex-col justify-center gap-3">
													<button
														onClick={() => handleDownloadPDF(order)}
														className="flex items-center text-center gap-2 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
													>
														<FaDownload className="group-hover:scale-110 transition-transform" />
														<span className="text-sm">PDF</span>
													</button>
													<button
														onClick={() => handleDeleteOrder(order.id)}
														className="group flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
													>
														<FaTrash className="group-hover:scale-110 transition-transform" />
														<span className="text-sm">Delete</span>
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="7" className="p-8 text-center text-gray-500">
											<div className="flex flex-col items-center gap-2">
												<span className="text-lg font-medium">No orders found</span>
												<span className="text-sm text-gray-400">Start shopping to see your orders here!</span>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order2;