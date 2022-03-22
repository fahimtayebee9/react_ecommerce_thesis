import { useState } from "react";
import DB_PRODUCTS from "../database/products_db";
import DB_ATTRIBUTES from "../database/attributes_db";
import { Link } from "react-router-dom";

const Categories = (props) => {
    const [products, setProducts] = useState(DB_PRODUCTS);
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
                    <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                    {
                        attributes.category.map((cat, index) => {
                            return (
                                <Link to={`/categories/${cat.uid}`} className="group relative">
                                    <div className="relative w-full mt-5 h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img src={ cat.image } 
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." 
                                            className="w-full h-full object-center object-cover" />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <p>
                                            <span className="absolute inset-0"></span>
                                            { cat.value }
                                        </p>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">
                                        {
                                            products.filter(item => item.category === cat.uid ).length
                                        }
                                    </p>
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;