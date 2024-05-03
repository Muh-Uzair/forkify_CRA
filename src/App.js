import { useState } from "react"







const API_KEY = `d84478c6-6132-4c64-b5fa-2427ec2eac58` ;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export default function App() {




//---------------------------------------------------------------------------------
  return(
    <div className="div_containing_everything">


      <main className="main_box">

        <HEADER_COMPONENT></HEADER_COMPONENT>


        <section className="section_left_right_both">

          <section className="section_left">

              <div className="div_display_recipe"></div>
              <div className="div_next_prev_btn"></div>

          </section>

          <section className="section_right">

          </section>


        </section>

      </main>

    </div>
  )
//---------------------------------------------------------------------------------


}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function HEADER_COMPONENT() {


            const [inputed_recipe_name , set_inputed_recipe_name] = useState("") ;
            const [arr_of_recipes , set_arr_of_recipes] = useState([])
            //__________________________________________________________________________________________
                    function handle_form_submit_search_btn_click(event_info_object) {
                      event_info_object.preventDefault() ;

                      fetch_recipe() 
                      
                      set_inputed_recipe_name("")              
                      
                    }
            //__________________________________________________________________________________________
                    async function fetch_recipe(){

                      try{

                        const respose = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${inputed_recipe_name}&key=${API_KEY}`) ;
                        const data = await respose.json() ;

                        // const recieved_arr_of_reciepes = [...data.data.recipes] ;

                        set_arr_of_recipes( arr_of_recipes => [...arr_of_recipes , ...data.data.recipes ])
                        
                        

                      }
                      catch(err) {

                        console.log(err)
                      }
                      finally{

                      }
                    } 







//---------------------------------------------------------------------------------
  return(

    <header className="section_header">

      <div className="div_forkify_logo">
        <img className="img_forkify_logo" src="forkify_logo.png" alt="img"/>
      </div>


      <div className="div_search_bar">
         <form className="form_input_search_bar" 
         onSubmit={(e) => handle_form_submit_search_btn_click(e)}>


          <input className="input_search_bar" placeholder="Search recipe" 
          value={inputed_recipe_name}
          onChange={(e) => set_inputed_recipe_name(e.target.value)}/>
           
          <button className="btn_search" onClick={(e) => handle_form_submit_search_btn_click(e)}>
                  <img className="img_search_icon" src="search_icon_2.png"  alt="img"/>
                  <p className="text_search">SEARCH</p>
          </button>

          
         </form>
      </div>


      <div className="div_add_recipes">
         <img className="img_add_recipe_icon" src="add_recipe_icon_2.png" alt="img"/> 
        <p className="text_add_recipe">ADD RECIPE</p>
      </div>



      <div className="div_add_bookmarks">
        <img className="img_add_recipe_icon" src="add_book_mark_icon_4.png" alt="img"/> 
        <p className="text_add_recipe">BOOKMARKS</p>
      </div>

      

    </header>

  )
//---------------------------------------------------------------------------------


}