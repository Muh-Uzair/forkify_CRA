import { useEffect, useState } from "react"
import { RIGHT_COMPONENT } from "./components_folder/RIGHT_COMPONENT";
import { HEADER_COMPONENT } from "./components_folder/HEADER_COMPONENT";
import { LEFT_COMPONENT } from "./components_folder/LEFT_COMPONENT";







export const API_KEY = `d84478c6-6132-4c64-b5fa-2427ec2eac58` ;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export default function App() {

  
              const [arr_of_recipes , set_arr_of_recipes] = useState([])
              const [is_loading , set_is_loading] = useState(false) ;
              const [page_num , set_page_num] = useState(1) ;
              const [check_for_no_results , set_check_for_no_results]= useState(false) ;
              const [recipe_clicked , set_recipe_clicked] = useState(false) ;
              const [recipe_object_to_show , set_recipe_object_to_show] = useState({}) ; 
              const [recipe_details , set_recipe_details] = useState({}) ;
              const [is_loading_right , set_is_loading_right] = useState(false) ;
              const [bookmarks_arr , set_bookmarks_arr] = useState(function() {
                let val_from_local_storage = JSON.parse(localStorage.getItem("bookmarked_recipe_arr")) ;
                if(!val_from_local_storage) {
                  val_from_local_storage=[] ;
                }
        
                return val_from_local_storage ;
              }) ;
              const [check_book_mark_right_clicked , set_check_book_mark_right_clicked] = useState(false) ;

              const [bookmarks_arr_detail , set_bookmarks_arr_detail] = useState(function(){
                let val_from_local_storage = JSON.parse(localStorage.getItem("bookmarked_recipe_arr_detail"))
                if(!val_from_local_storage){
                  val_from_local_storage = [] ;
                }
                return val_from_local_storage ;
              }
              );
              const [clicked_id, set_clicked_id] = useState("");

              
              
              


              //__________________________________________________________________________________
                      useEffect(function() {

                      localStorage.setItem("bookmarked_recipe_arr" ,  JSON.stringify(bookmarks_arr)) ;
                      },[bookmarks_arr])
              //__________________________________________________________________________________
                      useEffect(function() {

                        localStorage.setItem("bookmarked_recipe_arr_detail" ,  JSON.stringify(bookmarks_arr_detail)) ;
                        },[bookmarks_arr_detail])
              
        





//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
  return(
    <div className="div_containing_everything">




      <main className="main_box">

              <HEADER_COMPONENT 
              arr_of_recipes={arr_of_recipes}
              set_arr_of_recipes={set_arr_of_recipes}

              is_loading={is_loading}
              set_is_loading={set_is_loading}

              page_num={page_num}
              set_page_num={set_page_num}

              check_for_no_results={check_for_no_results}
              set_check_for_no_results={set_check_for_no_results}

              bookmarks_arr_detail={bookmarks_arr_detail}
              set_bookmarks_arr_detail={set_bookmarks_arr_detail}

              clicked_id={clicked_id}
              set_clicked_id={set_clicked_id}

              >

              </HEADER_COMPONENT>

              

        <section className="section_left_right_both">

              <LEFT_COMPONENT 
              arr_of_recipes={arr_of_recipes} 
              set_arr_of_recipes={set_arr_of_recipes}

              is_loading={is_loading}
              set_is_loading={set_is_loading}

              page_num={page_num}
              set_page_num={set_page_num}

              check_for_no_results={check_for_no_results}
              set_check_for_no_results={set_check_for_no_results}

              recipe_clicked={recipe_clicked}
              set_recipe_clicked={set_recipe_clicked}

              recipe_object_to_show={recipe_object_to_show}
              set_recipe_object_to_show={set_recipe_object_to_show}

              recipe_details={recipe_details}
              set_recipe_details={set_recipe_details}

              is_loading_right={is_loading_right}
              set_is_loading_right={set_is_loading_right}

              bookmarks_arr={bookmarks_arr}
              set_bookmarks_arr={bookmarks_arr}

              check_book_mark_right_clicked={check_book_mark_right_clicked}
              set_check_book_mark_right_clicked={set_check_book_mark_right_clicked}

              clicked_id={clicked_id}
              set_clicked_id={set_clicked_id}

              

              ></LEFT_COMPONENT>


              <RIGHT_COMPONENT
              recipe_clicked={recipe_clicked} 
              set_recipe_clicked={recipe_clicked}

              is_loading_right={is_loading_right} 
              set_is_loading_right={set_is_loading_right}

              recipe_details={recipe_details} 
              set_recipe_details={set_recipe_details}

              check_book_mark_right_clicked={check_book_mark_right_clicked} 
              set_check_book_mark_right_clicked={set_check_book_mark_right_clicked}

              bookmarks_arr={bookmarks_arr} 
              set_bookmarks_arr={set_bookmarks_arr}

              bookmarks_arr_detail={bookmarks_arr_detail}
              set_bookmarks_arr_detail={set_bookmarks_arr_detail}

              
              
              ></RIGHT_COMPONENT>
  

        </section>

      </main>

    </div>
  )
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------


}

