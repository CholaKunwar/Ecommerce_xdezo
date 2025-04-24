import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const StyleNestFAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const faqs = [
		{
			question: "How do I exchange an item purchased in a store?",
			answer:
				"Unwashed, unworn or defective merchandise may be exchanged within 14 days of purchase date. All returned items must have the tags attached, along with the original sales receipt. Please contact the store where the item was purchased for the exchange."
		},
		{
			question: "Where are StyleNest stores located?",
			answer:
				"We have stores in the following locations:\n\nKumaripati\nMaharajgunj\nCity Center (Kamal Pokhari)\nPokhara\nBaneshwor\nBoudha\nSwayambhu\nBhaktapur\nJhamsikhel\nCivil Mall (Sundhara).\n\nPlease click on the 'Find a Store' button on the top right corner to view a list of our locations with details."
		},
		{
			question: "Can I order StyleNest products online?",
			answer:
				"We have started delivery of limited products. Please DM us through Facebook or Instagram for more information. For our complete collection please visit the nearest StyleNest store."
		},
		{
			question: "Does StyleNest issue Gift Cards?",
			answer:
				"Yes, Gift Cards are now available from Kumaripati, City Center, Maharajgunj, and Baneshwor stores. They will be available in all our stores soon."
		},
		{
			question: "How can I track my order?",
			answer:
				"Currently, we do not have an automated tracking system. For any updates regarding your delivery, please contact us through our official social media channels."
		},
		{
			question: "Do you offer home delivery outside the Kathmandu Valley?",
			answer:
				"Home delivery is currently available within the Kathmandu Valley. We're working on expanding our services outside the valley soon."
		},
		{
			question: "Can I return items bought during a sale?",
			answer:
				"Sale items can only be exchanged for a different size or product of equal or greater value. Refunds are not available for discounted items."
		},
		{
			question: "Is there a loyalty program for regular customers?",
			answer:
				"We are in the process of launching a loyalty program. Stay tuned to our social media pages for updates and exclusive offers."
		},
		{
			question: "Can I customize my order?",
			answer:
				"Yes, customization is available for selected items. Please visit your nearest StyleNest store or contact us via social media for more details."
		},
		{
			question: "What payment methods do you accept?",
			answer:
				"We accept cash, debit/credit cards, and various digital wallets including eSewa, Khalti, and IME Pay."
		}
	];

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 lg:pt-18">
			<h1 className="text-4xl font-bold mb-10 text-center text-[#96785e]">StyleNest - Frequently Asked Questions</h1>
			<div className="space-y-4">
				{faqs.map((faq, index) => {
					const isOpen = openIndex === index;
					return (
						<div
							key={index}
							className={`border border-[#96785e] rounded-2xl p-6 shadow-md bg-[#f9f9f9] transition-all duration-300 ease-in-out hover:shadow-xl`}
						>
							<button
								onClick={() => toggleFAQ(index)}
								aria-expanded={isOpen}
								className="w-full flex justify-between items-center text-left text-xl font-semibold text-[#96785e] focus:outline-none"
							>
								<span>{faq.question}</span>
								{isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
							</button>
							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
									}`}
							>
								<p className="text-gray-800 whitespace-pre-line">{faq.answer}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StyleNestFAQ;
