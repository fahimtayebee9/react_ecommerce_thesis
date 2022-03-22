import DB_ATTRIBUTES from "../database/attributes_db";
import { useState } from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    return (
        <div className="group relative">
            <div className="d-block w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src={props.product.image} alt={props.product.name} 
                    className="w-75 h-75 object-center object-contain lg:w-full lg:h-full" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${props.product.id}`} >
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {props.product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{ attributes.category.find(cat => props.product.category === cat.uid).value}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">BDT. {props.product.cost}</p>
            </div>
        </div>
    );
}

export default Item;