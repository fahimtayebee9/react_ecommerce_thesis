/* eslint-disable jsx-a11y/anchor-is-valid */
const Item = (props) => {

    return (
        <div className="group relative">
            <div className="d-block w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src={props.product.image} alt={props.product.name} 
                    className="w-75 h-75 object-center object-contain lg:w-full lg:h-full" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href="#">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {props.product.name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{props.product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">BDT. {props.product.cost}</p>
            </div>
        </div>
    );
}

export default Item;