import  { useEffect, useState } from "react";
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

	const handleDownloadPDF = (receipt) => {
		const doc = new jsPDF();

		// Add background color
		doc.setFillColor(245, 245, 245); // bg-gray-50
		doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

		// Add logo
		doc.addImage(logo, 'PNG', 85, 10, 40, 30);

		// Title
		doc.setFontSize(24);
		doc.setTextColor(0, 102, 204);
		doc.text('Receipt', 105, 50, { align: 'center' });

		// Separator Line
		doc.setDrawColor(150, 150, 150);
		doc.line(20, 55, 190, 55);

		const startX = 20, startY = 65;
		const lineSpacing = 10;

		// Transaction Details
		doc.setFontSize(12);
		doc.setTextColor(40, 40, 40);
		doc.text(`Transaction No:`, startX, startY);
		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0);
		doc.text(`${receipt.id}`, startX + 50, startY);

		doc.setFontSize(12);
		doc.setTextColor(40, 40, 40);
		doc.text(`Transaction Date:`, startX, startY + lineSpacing);
		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0);
		doc.text(`${new Date(receipt.date).toLocaleString()}`, startX + 50, startY + lineSpacing);

		// Separator Line
		doc.setDrawColor(150, 150, 150);
		doc.line(20, startY + 3 * lineSpacing, 190, startY + 3 * lineSpacing);

		// Customer Information
		doc.setFontSize(14);
		doc.setTextColor(40, 40, 40);
		doc.text('Customer Information:', startX, startY + 5 * lineSpacing);
		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0);
		doc.text(`Name: ${receipt.deliveryInfo.firstName} ${receipt.deliveryInfo.lastName}`, startX, startY + 6 * lineSpacing);
		doc.text(`Phone: ${receipt.deliveryInfo.phone}`, startX, startY + 7 * lineSpacing);
		doc.text(`Email: ${receipt.deliveryInfo.email}`, startX, startY + 8 * lineSpacing);
		doc.text(`Address: ${receipt.deliveryInfo.street}, ${receipt.deliveryInfo.city}, ${receipt.deliveryInfo.state}, ${receipt.deliveryInfo.zipcode}, ${receipt.deliveryInfo.country}`, startX, startY + 9 * lineSpacing);

		// Ordered Items Table
		doc.setFontSize(14);
		doc.setTextColor(40, 40, 40);
		doc.text('Ordered Items:', startX, startY + 11 * lineSpacing);
		doc.setDrawColor(0, 0, 0);
		doc.line(20, startY + 12 * lineSpacing, 190, startY + 12 * lineSpacing);

		doc.setFontSize(12);
		doc.text('SN', startX, startY + 14 * lineSpacing);
		doc.text('Item', startX + 20, startY + 14 * lineSpacing);
		doc.text('Size', startX + 100, startY + 14 * lineSpacing);
		doc.text('Qty', startX + 130, startY + 14 * lineSpacing);
		doc.text('Amount', startX + 160, startY + 14 * lineSpacing);
		doc.line(20, startY + 15 * lineSpacing, 190, startY + 15 * lineSpacing);

		receipt.items.forEach((item, index) => {
			doc.text(`${index + 1}`, startX, startY + (16 + index) * lineSpacing);
			doc.text(item.name, startX + 20, startY + (16 + index) * lineSpacing);
			doc.text(item.size, startX + 100, startY + (16 + index) * lineSpacing);
			doc.text(`${item.quantity}`, startX + 130, startY + (16 + index) * lineSpacing);
		});

		// Total Amount
		doc.line(20, startY + (18 + receipt.items.length) * lineSpacing, 190, startY + (18 + receipt.items.length) * lineSpacing);
		doc.setFontSize(16);
		doc.setTextColor(0, 102, 204);
		doc.text(`Total Amount: Rs. ${receipt.totalAmount}/-`, startX + 90, startY + (20 + receipt.items.length) * lineSpacing);

		// Footer Note
		doc.setFontSize(10);
		doc.setTextColor(60, 60, 60);
		doc.text("Note: Thank you for your purchase!", startX, startY + (23 + receipt.items.length) * lineSpacing);
		doc.text("For any inquiries, contact our support team.", startX, startY + (24 + receipt.items.length) * lineSpacing);

		// Save the PDF
		doc.save(`receipt_${receipt.id}.pdf`);
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