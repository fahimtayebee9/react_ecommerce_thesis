import ProductsList from "./ProductsList";
import {useParams} from "react-router-dom";
import DB_PRODUCTS from "../database/products_db";

function SingleCategory() {
    const {id} = useParams();
    const products = DB_PRODUCTS.filter(product => product.category === id);
    
    return ( 
        <div className="single-category">
            <ProductsList category={id}/>
        </div>
    );
}

export default SingleCategory;