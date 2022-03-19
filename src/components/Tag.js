const Tag = (props) => {
    const handleRemoveTag = (tag) => {
        console.log(tag);
        props.removeTag(tag);
    }
    
    if(props.value !== "" && props.value !== undefined) {
        return null;
    }
    else{    
        return (
            <div className="relative inline-block text-left ml-3">
                {/* <div className="flex items-center rounded bg-white border-gray-200 px-1.5 sm:px-1.5 py-1.5  dark:bg-gray-200">
                    {props.value}
                    <button
                        type="button"
                        className="group inline-flex justify-center text-base font-medium text-white hover:text-gray-900 flex"
                        id="menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => handleRemoveTag(props.index)}
                    >
                        <img
                            src="/assets/icons/cancel.svg"
                            alt="cancel"
                            className="h-5 w-5 ml-2"
                        />
                    </button>
                </div> */}
            </div>
        );
    }
};

export default Tag;
