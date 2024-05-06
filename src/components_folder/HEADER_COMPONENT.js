import { useRef, useState } from "react";
import { API_KEY } from "../App";



////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export function HEADER_COMPONENT({
arr_of_recipes, set_arr_of_recipes,
is_loading, set_is_loading, 
page_num, set_page_num, 
check_for_no_results, set_check_for_no_results,
bookmarks_arr_detail , set_bookmarks_arr_detail ,
}) {


              const [inputed_recipe_name, set_inputed_recipe_name] = useState("");
              const check_for_same_search = useRef("");
              const [tool_tip_check, set_tool_tip_check] = useState(false) ;


              //__________________________________________________________________________________________
                      function handle_form_submit_search_btn_click(event_info_object) {
                        event_info_object.preventDefault();

                        set_inputed_recipe_name("");

                        if (check_for_same_search.current === inputed_recipe_name) {

                          return;
                        }

                        check_for_same_search.current = inputed_recipe_name;


                        fetch_recipe();


                        set_page_num(1);

                      }
              //__________________________________________________________________________________________
                      async function fetch_recipe() {



                        try {

                          set_is_loading(true);

                          const respose = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${inputed_recipe_name}&key=${API_KEY}`);
                          const data = await respose.json();

                          // const recieved_arr_of_reciepes = [...data.data.recipes] ;
                          set_arr_of_recipes(arr_of_recipes => [{}, ...data.data.recipes]);

                          set_is_loading(false);


                        }
                        catch (err) {

                          console.log(err);
                        }
                        finally {
                        }


                      }
              //__________________________________________________________________________________________
                      function handle_input_change(event_info_object) {

                        set_inputed_recipe_name(event_info_object.target.value);

                      }







//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
  return (

    <header className="section_header">

      <div className="div_forkify_logo">
        <img className="img_forkify_logo" src="forkify_logo.png" alt="img" />
      </div>


      <div className="div_search_bar">
        <form className="form_input_search_bar"
          onSubmit={(e) => handle_form_submit_search_btn_click(e)}>


          <input className="input_search_bar" placeholder="Search recipe"
            value={inputed_recipe_name}
            onChange={(e) => handle_input_change(e)} />

          <button className="btn_search" onClick={(e) => handle_form_submit_search_btn_click(e)}>
            <img className="img_search_icon" src="search_icon_2.png" alt="img" />
            <p className="text_search">SEARCH</p>
          </button>


        </form>
      </div>


      <div className="div_add_recipes">
        <img className="img_add_recipe_icon" src="add_recipe_icon_2.png" alt="img" />
        <p className="text_add_recipe">ADD RECIPE</p>
      </div>



      <div className="div_add_bookmarks" >

        <div className="div_add_bookmarks_inner">
            <img className="img_add_recipe_icon" src="add_book_mark_icon_5.png" alt="img" />
            <p className="text_add_recipe">BOOKMARKS</p>
        </div>

        <div className="div_bookmark_header_tool_tip"
        >hellow</div>
        
         

      </div>



    </header>

  );
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------



}
