import React from "react";
import Form from "next/form"
import SearchFormReset from "./serchformreset";
import {Search} from "lucide-react";

const SearchForm = ({query}:{query?:string})=>{

    


    return(
       <Form action="" scroll={false} className="search-form">
           <input type="text" 
           name="query"
           defaultValue={query}
           className="search-input"
           placeholder="Start Startups"/>

           <div className="flex gap-2">
                {
                    (query && <SearchFormReset/>)
                }
                <button type="submit" className="search-btn">
                 <Search className="size-5"></Search>
                </button>
           </div>
       </Form>
    )

}

export default SearchForm;