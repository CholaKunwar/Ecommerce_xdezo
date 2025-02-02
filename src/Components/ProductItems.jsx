import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);
	return (
		<div className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow overflow-hidden">
			<div className="w-full max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
				<div className='overflow-hidden'>
					<img className="hover:scale-110 transition ease-in-out rounded-t-lg" src={image[0]} alt="product image" />
				</div>
				<div className=" pb-1">
					<h5 className=" text-lg font-semibold text-gray-800 dark:text-white">{name.length>20? name.slice(0,20)+'..': name}</h5>

					<span className=" text-sm font-bold text-gray-700 dark:text-white">{currency} {price}</span>
					<Link to={`/product/${id}`}>
						<button className="block place-self-center mt-1 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">
							Quick View
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ProductItems