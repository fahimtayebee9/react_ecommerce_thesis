import DB_ATTRIBUTES from "../database/attributes_db";
import { useState } from "react";
const Tag = (props) => {
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    const removeTag = (tag) => {
        props.handleRemoveTag(tag);
    }
    
    console.log(props.value, props.type);

    return (
        <div className="relative inline-block text-left ml-3">
            <div className="flex items-center rounded bg-white border-gray-200 px-1.5 sm:px-1.5 py-1.5  dark:bg-gray-200">
                {   
                    (props.type === "brand") ?
                        attributes.brands.find((attribute) => Number(attribute.uid) === Number(props.value)).value :
                    (props.type === "category") ?
                        attributes.category.find(type => Number(props.value) === Number(type.uid)).value :
                    (props.type === "year") ?
                        attributes.year.find(yr => Number(props.value) === Number(yr.value)).value :
                    (props.type === "size") ?
                        attributes.size.find(sz => Number(props.value) === Number(sz.uid)).value : ""
                }
                <button
                    type="button"
                    className="group inline-flex justify-center text-base font-medium text-white hover:text-gray-900 flex"
                    id="menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => removeTag(props.type)} 
                    >
                    <img src="/assets/icons/cancel.svg" alt="cancel" className="h-5 w-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Tag;
