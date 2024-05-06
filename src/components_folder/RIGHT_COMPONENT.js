



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export function RIGHT_COMPONENT({
  recipe_clicked, set_recipe_clicked, is_loading_right, set_is_loading_right, recipe_details, set_recipe_details, check_book_mark_right_clicked, set_check_book_mark_right_clicked, bookmarks_arr, set_bookmarks_arr,

}) {


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
                        set_check_book_mark_right_clicked(true);
                      }
                      else if (check_for_bookmarked_recipe_existance_function() === true) {
                        // console.log(`exist : so removed`)
                        set_bookmarks_arr(bookmarks_arr => bookmarks_arr.filter(val => val !== recipe_details.id));
                        set_check_book_mark_right_clicked(false);
                      }

                    }






                    

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

            <div className="div_img_big_recipe">
              <img className="img_big_recipe" src={recipe_details.image_url} alt="img" />
            </div>


            <div className="div_time_plus_serving_plus_minus">

              <div className="div_time">
                <img className="clock_img" src="clock_icon.png" alt="img" />
                <p className="text_time"><strong>{recipe_details.cooking_time}</strong> MINUTES</p>

              </div>

              <div className="div_servings">

                <img className="img_servings" src="servings_icon.png" alt="img" />

                <p className="text_servings"><strong>{recipe_details.servings}</strong> SERVINGS</p>

                <button className="btn_plus">
                  <img className="img_plus" src="plus_icon.png" alt="img" />
                </button>

                <button className="btn_minus">
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

            </div>


            <div className="div_recipe_ingredients">

              <p className="text_ingrients">RECIPE INGREDIENTS</p>

              <div></div>

              <div className="div_all_recipe_ingredients">
                <ul>
                  {recipe_details.ingredients.slice(0, Math.trunc(recipe_details.ingredients.length) / 2)
                    .map((val, i) => (
                      <li key={i}>
                        <img className="img_tick_icon" src="tick_icon_2.png" alt="img" />
                        <p className="text_recipe_ingredients_detailed">{val.description}</p>
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

            <div className="div_how_to_cook_it">

              <p className="text_how_to_cook_it">HOW TO COOK IT</p>
              <p className="text_carefully">This recipe was carefully designed and tested by All Recipes. Please check out<br />directions at their website.</p>

              <a href={recipe_details.source_url} target="_blank" rel="noreferrer">
                <button className="btn_directions">DIRECTIONS &rarr;</button>
              </a>

            </div>


          </div>
          :
          <></>}

    </section>
  );
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------



}
