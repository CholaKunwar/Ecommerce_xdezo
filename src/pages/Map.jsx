import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/clerk-react";

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
			const serviceID = "service_z4ksltu";
			const templateID = "template_24fi8xm";
			const publicKey = "ydbzNCbAunOenUHLP";

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
			toast.error("Please login before sending message");
		}
	};

	const googleMapsUrl =
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306.76466802514966!2d83.98393505031744!3d28.222855004963996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995958fdcbc3d59%3A0xc29a1ebac783c3d4!2sSuper%20Electronics!5e0!3m2!1sen!2snp!4v1745221601663!5m2!1sen!2snp";

	return (
		<motion.div
			className="flex flex-col items-center justify-center min-h-screen text-[#3B2F2F] py-14 px-4 lg:p-18"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5C4033] via-[#A9746E] to-[#F4A261] p-4 text-center mb-10 transform transition-all hover:scale-105">
				Find Our Location
			</h1>

			<div className="flex flex-col lg:flex-row gap-12 lg:py-10 w-full max-w-7xl">
				{/* Google Map Section */}
				<motion.div
					className="w-full lg:w-1/2 p-4 lg:p-6 bg-[#f9f9f9] rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
					whileHover={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<iframe
						src={googleMapsUrl}
						width="100%"
						height="400"
						className="rounded-xl shadow-md border-none"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>

					<div className="mt-6 flex justify-center">
						<button
							className="bg-[#2A9D8F] hover:bg-[#21867A] text-white px-8 py-3 rounded-full shadow-md transition-all transform hover:scale-105 flex items-center gap-2"
							onClick={() => window.open(googleMapsUrl, "_blank")}
						>
							<MapPin size={20} />
							Open in Google Maps
						</button>
					</div>
				</motion.div>

				{/* Contact Form Section */}
				<motion.div
					className="w-full lg:w-1/2 p-4 lg:p-8 rounded-3xl hover:shadow-md transition-shadow duration-300"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className="text-4xl font-bold text-[#5C4033] text-center mb-8">
						Send Us a Message
					</h2>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<motion.div whileHover={{ scale: 1.02 }}>
							<input
								type="text"
								placeholder="Your Name"
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="bg-[#FDF6F0] w-full p-3 rounded-3xl text-[#3B2F2F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F4A261] border border-[#e0cfc2] shadow-sm"
								required
							/>
						</motion.div>
						<motion.div whileHover={{ scale: 1.02 }}>
							<input
								type="email"
								placeholder="Your Email"
								id="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="bg-[#FDF6F0] w-full p-3 rounded-3xl text-[#3B2F2F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F4A261] border border-[#e0cfc2] shadow-sm"
								required
							/>
						</motion.div>
						<motion.div whileHover={{ scale: 1.02 }}>
							<textarea
								placeholder="Your Message"
								id="message"
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
								required
								rows={5}
								className="bg-[#FDF6F0] w-full p-3 rounded-3xl text-[#3B2F2F] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F4A261] border border-[#e0cfc2] shadow-sm"
							></textarea>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }}>
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-[#5C4033] via-[#A9746E] to-[#F4A261] hover:to-[#DA8C60] text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
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
