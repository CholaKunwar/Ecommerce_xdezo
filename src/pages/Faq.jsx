import  { useState } from "react";
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
			question: "Where are  stores located?",
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
				"Yes, Gift Cards are now available from SiddharthaChowk, City Center, Maharajgunj, and Baneshwor stores. They will be available in all our stores soon."
		},
		{
			question: "How can I track my order?",
			answer:
				"Currently, we do not have an automated tracking system. For any updates regarding your delivery, please contact us through our official social media channels."
		},
		{
			question: "Do you offer home delivery outside the Pokhara Valley?",
			answer:
				"Home delivery is currently available within the Pokhara Valley. We're working on expanding our services outside the valley soon."
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
		}
	];

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="max-w-4xl mx-auto pb-6 pt-24">
			<h1 className="text-4xl font-bold mb-8 text-center text-rose-500">StyleNest - Frequently Asked Questions</h1>
			<div className="space-y-4">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className={`border border-rose-300 rounded-2xl p-4 shadow-md transition-all duration-300 bg-rose-50 hover:shadow-xl`}
					>
						<button
							onClick={() => toggleFAQ(index)}
							className="w-full flex justify-between items-center text-left text-xl font-semibold text-rose-700 focus:outline-none"
						>
							{faq.question}
							{openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
						</button>
						{openIndex === index && (
							<p className="mt-3 text-gray-800 whitespace-pre-line transition-opacity duration-300">
								{faq.answer}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default StyleNestFAQ;