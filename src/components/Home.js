import DB_PRODUCTS from "../database/products_db";
import { useState } from "react";
import DB_ATTRIBUTES from "../database/attributes_db";
import { Link } from "react-router-dom";
import Item from "./Item";

const Home = () => {
    const [products, setProducts] = useState(DB_PRODUCTS.filter(product => product.featured === true));
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:max-w-7xl">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Our Featured Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
                        {
                            products && products.length > 0 ? (
                                Object.keys(products).map((key) => {
                                    return (
                                        <Item key={products[key].id} product={products[key]} />
                                    );
                                })
                            ) : (
                                <div className="text-center">
                                    <h1 className="text-gray-500 text-xl">
                                        No Products Found
                                    </h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mx-auto py-10 sm:py-24 lg:py-32 lg:max-w-none">
                        <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>
                        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                        {
                            attributes.category.map((cat, index) => {
                                let products = DB_PRODUCTS.filter(product => Number(product.category) === Number(cat.uid));
                                return (
                                    <Link to={`/categories/${cat.uid}`} key={cat.uid} className="group relative">
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
                                                products.length
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
        </>
    );

}

export default Home;