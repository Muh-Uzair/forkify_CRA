import { useEffect, useRef, useState } from "react"
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
              const [for_add_recipe , set_for_add_recipe] = useState(false) ;
              const form_el = useRef(null) ;




              
              
              


              //__________________________________________________________________________________
                      useEffect(function() {

                      localStorage.setItem("bookmarked_recipe_arr" ,  JSON.stringify(bookmarks_arr)) ;
                      },[bookmarks_arr])
              //__________________________________________________________________________________
                      useEffect(function() {

                        localStorage.setItem("bookmarked_recipe_arr_detail" ,  JSON.stringify(bookmarks_arr_detail)) ;
                        },[bookmarks_arr_detail])

                        function check_for_bookmarked_recipe_existance_function(recieved_recipe) {
                          // console.log(recieved_recipe)
    
                          let flag = false;
    
                          for (let i = 0; i < bookmarks_arr.length; i++) {
                            if (bookmarks_arr[i] === recieved_recipe.id) {
                              flag = true;
                              return flag;
                            }
                          }
    
                          return flag;
                        }
                //_________________________________________________________________________________
                        function handle_recipe_click(event_info_object, val) {
    
                          if (recipe_details.id === val.id) return;
    
    
                          if (check_for_bookmarked_recipe_existance_function(val) === true) {
    
                            set_check_book_mark_right_clicked(true);
                          }
                          else if (check_for_bookmarked_recipe_existance_function(val) === false) {
    
                            set_check_book_mark_right_clicked(false);
                          }
    
                          set_recipe_clicked(true);
                          set_recipe_object_to_show(val);
                          set_clicked_id(val.id);
                          fetch_recipe_details_function(val.id);
    
                          
    
                        }
                //_________________________________________________________________________________
                        async function fetch_recipe_details_function(recieved_recipe_id) {
    
                          try {
    
                            set_is_loading_right(true);
                            const respose = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recieved_recipe_id}?key=${API_KEY}`);
                            const data = await respose.json();
    
                            // console.log(data.data.recipe) ;
                            set_recipe_details(data.data.recipe);
    
                            set_is_loading_right(false);
    
                          }
                          catch (err) {
    
                            console.log(err);
                          }
                          finally {
                          }
    
    
    
                        }
                 //_________________________________________________________________________________
                        function handle_add_recipe_click(event_info_object){
                          set_for_add_recipe(true);
                        }
                //_________________________________________________________________________________
                        function handle_btn_cross_click(event_info_object) {
                          set_for_add_recipe(false)
                        }
                //_________________________________________________________________________________
                        function handle_btn_upload_click_function(event_info_object){

                          event_info_object.preventDefault() ;

                          
                              // 1 : got array of arrays from form 
                              const form_data = [...new FormData(form_el.current)] ;

                              // const from_data_obj = Object.fromEntries(from_data) ;

                              // 2: 
                              const form_data_obj = {};
                              let ingredients = []; // Initialize ingredients array

                              form_data.forEach(([key, value]) => {
                                  if (key.startsWith("ingredient") && value.trim() !== "") {
                                      // Split the ingredient value by comma
                                      const parts = value.split(',');
                                      let [quantity, unit, description] = parts;
                                      
                                      // Trim each part to handle cases like ",,flour"
                                      quantity = quantity.trim() || null;
                                      unit = unit.trim() || null;
                                      description = description.trim();
                                      
                                      ingredients.push({ quantity, unit, description });
                                  } else {
                                      // For non-ingredient keys or empty ingredient values, directly add them to the form_data_obj
                                      form_data_obj[key] = value;
                                  }
                              });

                              form_data_obj.ingredients = ingredients;

                              console.log(form_data_obj);
                         
                                                      
                        }
        





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

              handle_recipe_click={handle_recipe_click}

              for_add_recipe={for_add_recipe}
              set_for_add_recipe={set_for_add_recipe}

              handle_add_recipe_click={handle_add_recipe_click}

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

              handle_recipe_click={handle_recipe_click}
              

              

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

      <main className="main_recipe_upload_bigger"
      style={for_add_recipe ? {opacity:"1" , zIndex:"21000" , transition: "all ease 0.3s"}: {opacity:"0"}}
      >

        <div className="div_recipe_upload">

          <button className="btn_cross" onClick={(e) => handle_btn_cross_click(e)}>
            <img className="img_cross" src="cross_icon_2.png" alt="img"/>
          </button>

          
          

          <form className="form_recipe_upload" ref={form_el} onSubmit={(e) => handle_btn_upload_click_function(e)}>

            
                <div className="div_label_inputs">

                      {/* <h2 className="h2_heading">RECIPE DATA</h2> */}

                      <label>Title</label>        
                      <input type="text" required name="title" value={"Karahi"}/>

                      <label>URL</label>          
                      <input type="text"  required name="url"  value={"https://fatimacooks.net/chicken-karahi-recipe-pictures-tips-authentic/"}/>

                      <label>Image URL</label>    
                      <input type="text" required name="image_url" value={"https://fatimacooks.net/wp-content/uploads/2020/02/IMG_1872-1152x1536.jpg"}/> 

                      <label>Publisher</label>    
                      <input type="text" required name="pusblisher" value={"Fatima Cooking"}/>

                      <label>Prep Time</label>    
                      <input type="text"  required name="prep_time" value={"60 min"}/>

                      <label>Servings</label>     
                      <input type="text" required name="servings" value={"4"}/>
                </div>

            
                <div className="div_label_inputs" >

                    {/* <h2 className="h2_heading">INGREDIENTS</h2> */}

                    <label >Ingredient 1</label>
                    <input type="text"  name="ingredient-1" placeholder="Format: 'Quantity,Unit,Description'" />

                    <label>Ingredient 2</label>
                    <input type="text"  name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />

                    <label>Ingredient 3</label>
                    <input type="text"   name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />

                    <label>Ingredient 4</label>
                    <input type="text"  name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />   

                    <label>Ingredient 5</label>
                    <input type="text"  name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />

                    <label>Ingredient 6</label>
                    <input type="text"  name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />

                </div>

              

              <button className="btn_form_submit" type="submit" >
                <img className="upload_icon" src="upload_icon.png" alt="img" />
                <p className="text_upload">UPLOAD</p>
              </button>           


          </form>

        </div>

        

      </main>

    </div>
  )
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------


}

