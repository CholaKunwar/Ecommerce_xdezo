import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useUser } from '@clerk/clerk-react';

const Map = () => {
	const { user } = useUser();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (user) {
			const serviceID = "service_z4ksltu"; // Your EmailJS Service ID
			const templateID = "template_24fi8xm"; // Your EmailJS Template ID
			const publicKey = "ydbzNCbAunOenUHLP"; // Your EmailJS Public Key

			const emailParams = {
				from_name: formData.name,
				from_email: formData.email,
				message: formData.message,
			};

			try {
				await emailjs.send(serviceID, templateID, emailParams, { publicKey });
				toast.success("Message sent successfully");
				setFormData({ name: "", email: "", message: "" });
			} catch (error) {
				console.error("Error sending message:", error);
				toast.error("Failed to send message. Please try again.");
			}
		} else {
			toast.error('please login before sending message');
		}
	};

	// const googleMapsUrl =
	// 	"https://www.google.com/maps/place/St.+Anne%E2%80%99s+Catholic+Church/@28.2233871,83.9817919,17z/";

	const googleMapsUrl =
		"https://www.google.com/maps/place/St.+Anne%E2%80%99s+Catholic+Church/@28.2232328,83.9840124,19.82z/data=!4m6!3m5!1s0x399594502e1c3263:0xa8a4377f075f281b!8m2!3d28.2233871!4d83.9843668!16s%2Fg%2F11c20c680r?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D";

	return (
		<motion.div
			className="flex flex-col items-center justify-center min-h-screen text-gray-900 py-14 px-4 lg:p-18"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-4 text-center mb-8 transform transition-all hover:scale-105">
				Find Our Location
			</h1>


			<div className="flex flex-col lg:flex-row gap-12 py-10 w-full max-w-7xl">
				{/* Google Map Section */}
				<motion.div
					className="w-full lg:w-1/2 p-6 rounded-2xl shadow-2xl"
					whileHover={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.4707839599364!2d83.98179187527333!3d28.22338707589064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399594502e1c3263%3A0xa8a4377f075f281b!2sSt.%20Anne%E2%80%99s%20Catholic%20Church!5e0!3m2!1sen!2snp!4v1741152809363!5m2!1sen!2snp"
						width="100%"
						height="400"
						className="rounded-xl shadow-lg border-none"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>

					<div className="mt-8 flex justify-center">
						<button
							className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
							onClick={() => window.open(googleMapsUrl, "_blank")}
						>
							<MapPin size={20} />
							Open in Google Maps
						</button>
					</div>
				</motion.div>

				{/* Contact Form Section */}
				<motion.div
					className="w-full lg:w-1/2 p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className="text-4xl font-bold text-rose-500 text-center mb-8">
						Send Us a Message
					</h2>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<input
								type="text"
								placeholder="Your Name"
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="w-full p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 border border-gray-300 shadow-sm"
								required
							/>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<input
								type="email"
								placeholder="Your Email"
								id="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								required
								className="w-full p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 border border-gray-300 shadow-sm"
							/>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<textarea
								placeholder="Your Message"
								id="message"
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
								required
								rows={5}
								className="w-full p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 border border-gray-300 shadow-sm"
							></textarea>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
							>
								Send Message
							</button>
						</motion.div>
					</form>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Map;