



/////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { API_KEY } from "../App";




/////////////////////////////////////////////////////////////////////////////////////
export function RIGHT_COMPONENT({

recipe_clicked, set_recipe_clicked, 
is_loading_right, set_is_loading_right, 
recipe_details, set_recipe_details, 
check_book_mark_right_clicked, set_check_book_mark_right_clicked, 
bookmarks_arr, set_bookmarks_arr,
bookmarks_arr_detail, set_bookmarks_arr_detail ,
API_KEY ,

}) {
            const [servings_number , set_servings_number] = useState(0)

            const [cooking_time_for_one_person , set_cooking_time_for_one_person] = useState(0) ;
            const [total_cooking_time , set_total_cooking_time] = useState(0) ;

            const [initial_quantity , set_initial_quantity] = useState([]) ;


            //__________________________________________________________________________________
                    function check_for_bookmarked_recipe_existance_function() {

                      let flag = false;

                      for (let i = 0; i < bookmarks_arr.length; i++) {
                        if (bookmarks_arr[i] === recipe_details.id) {
                          flag = true;
                        }
                      }

                      return flag;
                    }
            //__________________________________________________________________________________
                    function book_mark_right_clicked_function(event_info_object) {


                      if (check_for_bookmarked_recipe_existance_function() === false) {
                        // console.log(`not exist : so added`)
                        set_bookmarks_arr(bookmarks_arr => [...bookmarks_arr, recipe_details.id]);
                        set_bookmarks_arr_detail( bookmarks_arr_detail => [...bookmarks_arr_detail , recipe_details])
                        set_check_book_mark_right_clicked(true);
                      }
                      else if (check_for_bookmarked_recipe_existance_function() === true) {
                        // console.log(`exist : so removed`)
                        set_bookmarks_arr(bookmarks_arr => bookmarks_arr.filter(val => val !== recipe_details.id));
                        set_bookmarks_arr_detail(bookmarks_arr_detail => bookmarks_arr_detail.filter(val => val.id !== recipe_details.id))
                        set_check_book_mark_right_clicked(false);
                      }

                    }
            //__________________________________________________________________________________
                    function btn_plus_clicked(event_info_object){
                      set_servings_number( servings_number => servings_number+1)
                    }
            //__________________________________________________________________________________
                    function btn_minus_clicked(event_info_object){
                      if(servings_number===1) return 

                      set_servings_number( servings_number => servings_number-1)  
                                    
                    }
            //__________________________________________________________________________________
                    useEffect(function() {

                      

                      function callback(){
                        
                        set_servings_number(recipe_details.servings) ;
                        set_total_cooking_time(0) ;

                        set_cooking_time_for_one_person(recipe_details.cooking_time / recipe_details.servings)

                        

                        const new_arr = recipe_details.ingredients.map( (val) => {
                          if(val.quantity) {
                            val.quantity = (val.quantity / recipe_details.servings).toFixed(2)
                          }
                          return val.quantity ;
                        })

                       set_initial_quantity(new_arr)
                      }

                      if (recipe_details && Object.keys(recipe_details).length > 0) {
                        callback();
                      }

                    },[recipe_details.id])

            //__________________________________________________________________________________
                    useEffect(function() {

                      function callback() {

                        set_total_cooking_time( Math.ceil(cooking_time_for_one_person * servings_number) )

                        
                        const new_arr = recipe_details.ingredients.map( (val,i) => {

                          if(val.quantity) {
                            val.quantity = (initial_quantity[i] * servings_number).toFixed(1)
                          }
                          
                          return val ;
                        })

                        set_recipe_details(recipe_details => ({ ...recipe_details, new_arr }));

                      }
                      if(servings_number > 0) {
                        callback() ;
                      }

                    },[servings_number])


            

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
  return (

    <section className="section_right">

      {!recipe_clicked &&
        <div className="div_before_searching">
          <img className="img_smiley_face" src="smiley_face.png" alt="img" />
          <p className="text_start_searching">Start by searching for a recipe or <br></br> an ingredient. Have fun!</p>

        </div>}
      {is_loading_right ?
        <p className="text_loading">LOADING...</p>
        :
        recipe_clicked
          ?
          <div className="div_show_recipe_detials">

            <IMG_BIG_RECIPE recipe_details={recipe_details} /> 

            <TIME_SERVING_BOOKMARK 
            recipe_details={recipe_details}
            total_cooking_time={total_cooking_time} 
            servings_number={servings_number}
            book_mark_right_clicked_function={book_mark_right_clicked_function}
            btn_plus_clicked={btn_plus_clicked}
            btn_minus_clicked={btn_minus_clicked}
            check_book_mark_right_clicked={check_book_mark_right_clicked}

            />    

            <RECIPE_INGREDIENTS recipe_details={recipe_details} />    

            <HOW_TO_COOK recipe_details={recipe_details} />         
            




          </div>
          :
          <></>}

    </section>
  );
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

}




/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function IMG_BIG_RECIPE({recipe_details}) {

  return(
    <div className="div_img_big_recipe">
              <img className="img_big_recipe" src={recipe_details.image_url} alt="img" />
    </div>
  )

}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function TIME_SERVING_BOOKMARK({
recipe_details , total_cooking_time , 
servings_number , book_mark_right_clicked_function, 
btn_plus_clicked, btn_minus_clicked ,
check_book_mark_right_clicked ,
}){

  return(

    <div className="div_time_plus_serving_plus_minus">

    <div className="div_time">
      <img className="clock_img" src="clock_icon.png" alt="img" />
      <p className="text_time"><strong>{total_cooking_time ? total_cooking_time : recipe_details.cooking_time}</strong> MINUTES</p>

    </div>

    <div className="div_servings">

      <img className="img_servings" src="servings_icon.png" alt="img" />

      <p className="text_servings"><strong>{servings_number ? servings_number : recipe_details.servings}</strong> SERVINGS</p>

      <button className="btn_plus" onClick={(e) => btn_plus_clicked(e)}>
        <img className="img_plus" src="plus_icon.png" alt="img" />
      </button>

      <button className="btn_minus" onClick={(e) => btn_minus_clicked(e)}>
        <img className="img_minus" src="minus_icon.png" alt="img" />
      </button>


    </div>

    <div className="div_btn_bookmark_right">

      <button className="btn_bookmark_right" onClick={(e) => book_mark_right_clicked_function(e)}>

        {check_book_mark_right_clicked ?
          <img className="img_bookmark_right" src="bookmark_icon_right.png" alt="img" />
          :
          <img className="img_bookmark_right" src="bookmark_icon_right_2.png" alt="img" />}
      </button>

    </div>

    {recipe_details.key === API_KEY 
    ?
    <div className="div_person_icon_right">

      <div className="div_person_icon_right_inner">
        <img className="img_person_icon_right" src="person_icon.png" alt="img"/>
      </div>

    </div> 
    : 
    <></>}

</div>

  )
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function RECIPE_INGREDIENTS({
recipe_details , 
}) {

  return(

    <div className="div_recipe_ingredients">

              <p className="text_ingrients">RECIPE INGREDIENTS</p>

              <div></div>

              <div className="div_all_recipe_ingredients">
                <ul>
                  {recipe_details.ingredients.slice(0, Math.trunc(recipe_details.ingredients.length) / 2)
                    .map((val, i) => (
                      <li key={i}>
                        <img className="img_tick_icon" src="tick_icon_2.png" alt="img" />
                        <p className="text_recipe_ingredients_detailed">{val.quantity} {val.unit} {val.description}</p>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="div_all_recipe_ingredients">
                <ul>
                  {recipe_details.ingredients.slice((Math.trunc(recipe_details.ingredients.length) / 2), Math.trunc(recipe_details.ingredients.length))
                    .map((val, i) => (
                      <li key={i}>
                        <img className="img_tick_icon" src="tick_icon_2.png" alt="img" />
                        <p className="text_recipe_ingredients_detailed">{val.quantity} {val.unit} {val.description}</p>

                      </li>
                    ))}
                </ul>
              </div>

    </div>

  )
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function HOW_TO_COOK({
recipe_details ,
}){

  return(

        <div className="div_how_to_cook_it">

              <p className="text_how_to_cook_it">HOW TO COOK IT</p>
              <p className="text_carefully">This recipe was carefully designed and tested by All Recipes. Please check out<br />directions at their website.</p>

              <a href={recipe_details.source_url} target="_blank" rel="noreferrer">
                <button className="btn_directions">DIRECTIONS &rarr;</button>
              </a>

      </div>

  )

}