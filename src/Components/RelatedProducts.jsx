import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItems from "./ProductItems";

const RelatedProduct = ({ category, subCategory }) => {
	const { products } = useContext(ShopContext);
	const [related, setRelated] = useState([]);

	useEffect(() => {
		if (products.length > 0) {
			let productsCopy = products.slice();

			productsCopy = productsCopy.filter((item) => category === item.category);
			productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);

			setRelated(productsCopy.slice(0, 4));
		}
	}, [products]);

	return (
		<div className="">	
				{/* ===== Related Products ===== */}
				<div className="mt-12">
					<h2 className="text-2xl font-bold mb-6">Related Products</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{related.map((item,index) => (						
								<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} ></ProductItems>
						))}
					</div>
				</div>
			


		</div>
	);
};

export default RelatedProduct;