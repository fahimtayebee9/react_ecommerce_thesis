import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DB_PRODUCTS from "../database/products_db";
import DB_ATTRIBUTES from "../database/attributes_db";
import { Link } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const ProductDetail = (props) => {
    const id = useParams();
    const product = DB_PRODUCTS.filter((product) => Number(product.id) === Number(id.id))[0];
    // const [crumbs, setCrumbs] = useState(props.crumbs);
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    // DEFAULT CRUMBS
    const [search_crumbs, setSearchCrumbs] = useState([
        {name: "Home", url: '/'},
        {name: "Products", url: '/products'},
    ]);

    const addToCart = (product) => {
        props.addToCart(product);
    }

    useEffect(() => {
        // CHECKING IF THERE IS A QUERY
        if(product){
            let queryArray = null;
            let count = 0;
            let newCrumbs = [
                {name: "Home", url: '/'},
                {name: "Products", url: '/products'}
            ];

            // CHECKING IF THERE IS A QUERY WITH A SPACE
            if(product.name.includes(" ")){
                queryArray = product.name.split(" ");
            }else{
                queryArray = [product.name];
            }
            
            // LOOPING THROUGH THE QUERY ARRAY AND PUSHING THE QUERY TO THE SEARCH CRUMBS
            while(count < queryArray.length){
                newCrumbs.push({name: queryArray[count], url: '/search/' + queryArray[count]});
                setSearchCrumbs(newCrumbs);
                count++;
            }
        }
    }, [product.name, search_crumbs, setSearchCrumbs, product]);

    // UPDATE CRUMBS ON CRUMB CLICK
    const handleCrumbsClick = (crumb) => {
        console.log(crumb);
        search_crumbs.splice(search_crumbs.indexOf(crumb) + 1, search_crumbs.length - (search_crumbs.indexOf(crumb) + 1));
    };
    
    return (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto breadcrumb block">
                    <Breadcrumb handleCrumbsClick={handleCrumbsClick} crumbs={ search_crumbs } selected={ props.selected } />
                </div>
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                        src={product.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {DB_ATTRIBUTES.brands.filter((attribute) => Number(attribute.uid) === Number(product.brand))[0].value}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>

                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex ml-0 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                        {
                                            product.size.map((size) => {
                                                return <option key={size} value={size}>{DB_ATTRIBUTES.size.filter((attribute) => Number(attribute.uid) === Number(size))[0].value}</option>
                                            })
                                        }
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">BDT. {product.price}</span>
                            <button className="flex ml-auto text-purple bg-purple-200 border-0 py-2 px-6 focus:outline-none 
                                    hover:bg-purple-600 hover:text-white rounded" onClick={() => addToCart(product)}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;