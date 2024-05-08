
import { useState , useRef } from "react";
import { API_KEY } from "./common";


export default function RECIPE_UPLOAD({
    bookmarks_arr , set_bookmarks_arr ,
    bookmarks_arr_detail , set_bookmarks_arr_detail ,
    for_add_recipe , set_for_add_recipe ,
  }){
  
              const [wrong_data_format_error , set_wrong_data_format_error] = useState(false) ;
              const [recipe_upload_success , set_recipe_upload_success] = useState(false) ;
              const [recipe_uploading , set_recipe_uploading] = useState(false) ;
              const [wrong_format_error_msg , set_wrong_format_error_msg] = useState("") ;
              const form_el = useRef(null) ;
  
  
  
            //_________________________________________________________________________________
                    function handle_btn_cross_click(event_info_object) {
                      if(wrong_data_format_error) {
                        set_wrong_data_format_error(false)
                        return
                      }
                      if(recipe_upload_success){
                        set_recipe_upload_success(false) ;
                        return;
                      }
                      
                      set_for_add_recipe(false)
                    }
            //_________________________________________________________________________________
                    async function send_recipe_to_api_function() {
  
                       try{
  
                         // 1 : got array of arrays from form 
                         const form_data = [...new FormData(form_el.current)] ;
  
                         // 2 : preparing the object to upload
                         const form_data_obj = {};
                         let ingredients = []; // Initialize ingredients array
                         
                         form_data.forEach(([key, value]) => {
                             if (key.startsWith("ingredient") && value.trim() !== "") {
  
                                 // Check if the value contains two commas
                                 const commaCount = (value.match(/,/g) || []).length;
                                 if (commaCount !== 2) {
                                     throw new Error(`Invalid format for ${key}: ${value}. It should contain exactly two commas.`);
                                 }
                         
                                 // Split the ingredient value by comma
                                 const parts = value.split(',');
                                 let [quantity, unit, description] = parts;
                         
                                 // Trim each part only if it's not null or undefined
                                 if (quantity !== null && quantity !== undefined) {
                                     quantity = quantity.trim() || null;
                                 }
                                 if (unit !== null && unit !== undefined) {
                                     unit = unit.trim() || null;
                                 }
                                 if (description !== null && description !== undefined) {
                                     description = description.trim();
                                 }
                         
                                 // Check if description is missing
                                 if (!description) {
                                     throw new Error(`Description is required for ${key}: ${value}`);
                                 }
                         
                                 // Check if quantity is a valid number
                                 if (!isNaN(quantity)) {
                                     // Only push to ingredients array if the description is not empty
                                     if (description !== "") {
                                         ingredients.push({ quantity, unit, description });
                                     }
                                 } else {
                                     throw new Error(`Quantity should be a number for ${key}: ${value}`);
                                 }
                             } else {
                                 // For non-ingredient keys, directly add them to the form_data_obj
                                 if (value.length > 0) {
                                     form_data_obj[key] = value;
                                 }
                             }
                         });
                         
                         form_data_obj.ingredients = ingredients;
  
                         
                        //-----------------------
                        set_recipe_uploading(true)
                        const recipe_recived_again = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`,
                          {
                            method:"POST" ,
                            headers :{
                              "Content-Type" : "application/json"
                            } ,
                            body: JSON.stringify(form_data_obj),
                          }
                        )
                        console.log(recipe_recived_again);
                        if(recipe_recived_again.ok === true) {
                          set_recipe_upload_success(true) ;
                        }
  
                        const data = await recipe_recived_again.json() ;
                        console.log(data)
                        const our_recipe = data.data.recipe ;
                        set_recipe_uploading(false) ;
  
                        set_bookmarks_arr(bookmarks_arr => [...bookmarks_arr, our_recipe.id]);
                        set_bookmarks_arr_detail( bookmarks_arr_detail => [...bookmarks_arr_detail , our_recipe])
  
  
                       }
                       catch(err) {
  
                          set_wrong_data_format_error(true) ;
                        
                          set_wrong_format_error_msg(err.message);    
                        }
                       finally{
  
                       }
  
                    }
            //_________________________________________________________________________________
                    function handle_btn_upload_click_function(event_info_object){
  
                      event_info_object.preventDefault() ;
                        
                      // calling function
                      send_recipe_to_api_function()
                                                       
                    }
  
  
  
  
    return(
  
  
      <main className="main_recipe_upload_bigger"
      style={for_add_recipe ? {opacity:"1" , zIndex:"21000" , transition: "all ease 0.3s"}: {opacity:"0"}}
      >
  
                    <div className="div_recipe_upload">
            
                                    <button className="btn_cross" onClick={(e) => handle_btn_cross_click(e)}>
                                    <img className="img_cross" src="cross_icon_2.png" alt="img"/>
                                    </button>
                    
                                    {wrong_data_format_error
                                    ?

                                    <ERR_MSG wrong_format_error_msg={wrong_format_error_msg}/>

                                    :
                                    recipe_uploading 
                                    ?
                                    <p className="text_loading" style={{marginTop:"24%"}}>UPLOADING...</p> 
                                    :
                    
                                    recipe_upload_success ? 
                                    <div className="div_recipe_upload_success" >
                                    <img src="smiley_face.png" alt="img" style={{display:"inline"}}/>
                                    <p className="text_upload_success">SUCCESSFULLY UPLOADED</p> 
                                    </div>                             
                                    :
                                    <>
                    
                                        <div className="div_form_headings">
                                            <h3>RECIPE DATA</h3>
                                            <h3>INGREDIENTS</h3>
                                        </div>
                    
                                        <FORM_RECIPE_UPLOAD handle_btn_upload_click_function={handle_btn_upload_click_function} form_el={form_el} />

                                    </>
                    
                                    }
            
                    </div>
  
      </main>
  
  
    )
}


function ERR_MSG({wrong_format_error_msg}){

    return(

    <div className="div_error_msg">
  
  
                <div className="div_actual_error_msg">

                <img className="img_error_msg_icon" src="cuation_icon_2.png" alt="img" />
                <p className="text_error_msg">{wrong_format_error_msg}</p>

                </div>


                    <div className="div_correct_wrong_format">

                        <ul>
                        <h3>CORRECT FORMAT</h3>
                        <li>Correct Format : quantity: 1 , unit: cup, description: oil <br/> <strong><span style={{color:"green"}}>✔</span> 1 , cup , oil</strong></li>
                        <li>Correct Format : quantity:  , unit: , description: flour <br/> <strong><span style={{color:"green"}}>✔</span> , , flour </strong></li>
                        <li>Correct Format : quantity: 1 , unit: , description: avacado <br/> <strong><span style={{color:"green"}}>✔</span> 1, ,avacado  </strong></li>
                        </ul>

                        <ul>
                        <h3>WRONG FORMAT</h3>
                        <li>Wrong Format : quantity: 1  unit: cup description: oil <br/> <strong>❌ 1  cup  oil </strong></li>
                        <li>Wrong Format : quantity: one , unit: kg , description: chicken <br/> <strong>❌ one , kg , chicken </strong></li>
                        <li>Wrong Format : quantity: 1 , unit: kg , description: <br/> <strong> ❌ 1 , kg , </strong></li>
                        </ul>

                    </div>
                
        
      </div>


    )
}

function FORM_RECIPE_UPLOAD({handle_btn_upload_click_function , form_el}){

    return(
        <form className="form_recipe_upload" ref={form_el} onSubmit={(e) => handle_btn_upload_click_function(e)}>
  
                              
                            <div className="div_label_inputs" >
  
                                  <label>Title</label>        
                                  <input type="text" required name="title" />
  
                                  <label>URL</label>          
                                  <input type="text"  required name="source_url" />
  
                                  <label>Image URL</label>    
                                  <input type="text" required name="image_url" /> 
  
                                  <label>Publisher</label>    
                                  <input type="text" required name="publisher" />
  
                                  <label>Prep Time</label>    
                                  <input type="number"  required name="cooking_time" />
  
                                  <label>Servings</label>     
                                  <input type="number" required name="servings" />
                            </div>
  
                        
                            <div className="div_label_inputs" >
  
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
    )
}