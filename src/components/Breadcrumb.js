import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
    function isLast(index) {
        return index === props.crumbs.length - 1;
    }
    
    return (
        <nav className="flex py-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {
                    
                    props.crumbs && props.crumbs.length > 0 ? (
                        Object.keys(props.crumbs).map((key) => {
                            const disabled = (key === props.crumbs.length - 1) ? 'disabled' : '';
                            const svg = (key === 0) ?
                                <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 
                                        011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> :
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" 
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 
                                            1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>;
                            if(key === props.crumbs.length - 1){
                                return (
                                    <li key={key} className="inline-flex items-center">
                                        <div className="flex items-center">
                                            {svg}
                                            {props.crumbs[key].name}
                                        </div>
                                    </li>
                                );
                            }
                            else{
                                return (
                                    <li key={key} className="inline-flex items-center">
                                        <div className="flex items-center">
                                            {svg}
                                            <Link to={props.crumbs[key].url} className={ `ml-1 text-medium font-medium text-gray-700 hover:text-gray-900 md:ml-2 
                                                dark:text-gray-400 dark:hover:text-purple`}>
                                                {props.crumbs[key].name}
                                            </Link>
                                        </div>
                                    </li>
                                );
                            }
                        })
                    ) : ""
                }
            </ol>
        </nav>
    );

};

export default Breadcrumb;