import ProductsList from "./ProductsList";
import {useParams} from "react-router-dom";
import DB_PRODUCTS from "../database/products_db";
import DB_ATTRIBUTES from "../database/attributes_db";

function SingleCategory() {
    const {id} = useParams();
    const products = DB_PRODUCTS.filter(product => product.category === id);
    
    return ( 
        <div className="single-category">
            <ProductsList category={id} crumbs={[
                    {name: "Home", url: '/'}, 
                    {name: "Categories", url: '/categories'} , 
                    {name: DB_ATTRIBUTES.category.find(item => Number(item.uid) === Number(id)).value, url: `/categories/${id}`}
                ]}/>
        </div>
    );
}

export default SingleCategory;