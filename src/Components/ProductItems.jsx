import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProductItems = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);

	return (
		<div className="bg-[#fdfbf9] rounded-2xl shadow-md p-2 hover:shadow-xl transition-all duration-300">
			<div className="w-full max-w-sm bg-[#f9f7f4] rounded-2xl overflow-hidden">
				<div className="overflow-hidden rounded-t-2xl">
					<img
						className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
						src={image[0]}
						alt={name}
					/>
				</div>
				<div className="p-2">
					<h5 className="text-lg font-semibold text-gray-800 mb-1">
						 {/* eslint-disable-next-line react/prop-types */}
						{name.length > 18 ? name.slice(0, 18) + '...' : name}
					</h5>
					<span className="text-md font-bold text-[#96785e]">{currency} {price}</span>
					<Link to={`/product/${id}`}>
						<button
							onClick={() => scrollTo(0, 0)}
							className="mt-3 w-full bg-[#96785e] text-white hover:bg-[#7b624b] py-2 px-4 rounded-xl transition-all duration-300"
						>
							Quick View
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductItems;
