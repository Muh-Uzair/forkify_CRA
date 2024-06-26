import { useEffect, useRef, useState } from "react";
import {RECIPE_LIST} from "./common"


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export function LEFT_COMPONENT({
arr_of_recipes, set_arr_of_recipes, 
is_loading, set_is_loading, 
page_num, set_page_num, 
check_for_no_results, set_check_for_no_results, 
recipe_clicked, set_recipe_clicked,
recipe_object_to_show, set_recipe_object_to_show, 
recipe_details, set_recipe_details,
is_loading_right, set_is_loading_right, 
bookmarks_arr, set_bookmarks_arr, 
check_book_mark_right_clicked, set_check_book_mark_right_clicked,
clicked_id , set_clicked_id ,
handle_recipe_click ,

}) {


  const [arr_of_recipes_for_display, set_arr_of_recipes_for_display] = useState([]);
  const last_page = useRef(1);
 







            //_________________________________________________________________________________
                    function handle_btn_back_click(event_info_object) {
                      set_page_num(page_num => page_num - 1);
                    }
            //_________________________________________________________________________________
                    function handle_btn_forward_click(event_info_object) {
                      set_page_num(page_num => page_num + 1);
                    }
            //_________________________________________________________________________________
                    useEffect(function () {

                      if (arr_of_recipes.length) {


                        // console.log(arr_of_recipes.slice(page_num*10-9 , page_num*10+1)) ;
                        // console.log(arr_of_recipes) ;
                        set_arr_of_recipes_for_display(arr_of_recipes.slice(page_num * 10 - 9, page_num * 10 + 1));
                        last_page.current = (Math.trunc(arr_of_recipes.length / 10)) + 1;


                      }
                      if (arr_of_recipes.length === 1) {
                        set_check_for_no_results(true);
                      }
                      else if (arr_of_recipes.length > 1) {
                        set_check_for_no_results(false);
                      }

                    }, [arr_of_recipes, page_num, set_check_for_no_results]);
            //_________________________________________________________________________________







//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
  return (

    <section className="section_left">

      <div className="div_display_recipe">


        {is_loading === true ?
          <p className="text_loading">LOADING...</p>
          :
          check_for_no_results ?
            <>
              <p className="cross_sign">❌</p> <p className="text_sorry_msg">No results</p>
            </>
            :
            <RECIPE_LIST 
            arr_of_recipes={arr_of_recipes_for_display}
            handle_recipe_click={handle_recipe_click}
            clicked_id={clicked_id}
            />
        }
            

      </div>

      {arr_of_recipes.length ?
      <NEXT_PREVIOUS_BUTTONS 
      page_num={page_num}
      handle_btn_back_click={handle_btn_back_click}
      last_page={last_page}
      handle_btn_forward_click={handle_btn_forward_click}
      />


        :
        <></>}

    </section>

  );
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------


}



/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function NEXT_PREVIOUS_BUTTONS({
page_num , handle_btn_back_click ,
last_page , handle_btn_forward_click ,
}){

  return(
        <div className="div_next_prev_btn">

              {page_num === 1 ?
                <div></div> :
                <button className="btn_back_page page_btn" onClick={(e) => handle_btn_back_click(e)}>&larr; Page <strong>{page_num - 1}</strong></button>}
              {page_num === last_page.current ? <div></div> :
                <button className="btn_forward_page page_btn" onClick={(e) => handle_btn_forward_click(e)}>Page <strong>{page_num + 1}</strong> &rarr;</button>}

        </div>
  )
}