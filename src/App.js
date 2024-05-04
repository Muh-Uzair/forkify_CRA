import { useEffect, useRef, useState } from "react"







const API_KEY = `d84478c6-6132-4c64-b5fa-2427ec2eac58` ;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
export default function App() {

  
  const [arr_of_recipes , set_arr_of_recipes] = useState([])
  const [is_loading , set_is_loading] = useState(false) ;
  const [page_num , set_page_num] = useState(1) ;
  const [check_for_no_results , set_check_for_no_results]= useState(false) ;




//---------------------------------------------------------------------------------
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
          ></LEFT_COMPONENT>



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
function HEADER_COMPONENT({
arr_of_recipes, set_arr_of_recipes,
is_loading , set_is_loading ,
page_num , set_page_num ,
check_for_no_results , set_check_for_no_results ,
}) {


            const [inputed_recipe_name , set_inputed_recipe_name] = useState("") ;
            const check_for_same_search = useRef("") ;
            
            
            //__________________________________________________________________________________________
                    function handle_form_submit_search_btn_click(event_info_object) {
                      event_info_object.preventDefault() ;

                      if(check_for_same_search.current === inputed_recipe_name ) {
                        set_inputed_recipe_name("")   
                        return ;
                      }
                      
                      check_for_same_search.current = inputed_recipe_name ; 
                      check_for_no_results.current = false ;
                                    
                      fetch_recipe() 
                      
                       
                      set_page_num(1) ;         
                      
                    }
            //__________________________________________________________________________________________
                    async function fetch_recipe(){

                      

                      try{

                        set_is_loading(true)

                        const respose = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${inputed_recipe_name}&key=${API_KEY}`) ;
                        const data = await respose.json() ;

                        // const recieved_arr_of_reciepes = [...data.data.recipes] ;

                        set_arr_of_recipes( arr_of_recipes => [{} ,...data.data.recipes ])
                        

                        set_is_loading(false)                        
                        

                      }
                      catch(err) {

                        console.log(err)
                      }
                      finally{

                      }

                      
                    } 
            //__________________________________________________________________________________________
                    function handle_input_change(event_info_object) {

                      set_inputed_recipe_name(event_info_object.target.value) ;

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
          onChange={(e) => handle_input_change(e)}/>
           
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
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function LEFT_COMPONENT({
arr_of_recipes , set_arr_of_recipes ,
is_loading , set_is_loading ,
page_num , set_page_num ,
check_for_no_results , set_check_for_no_results ,
}) {

            
            const [arr_of_recipes_for_display , set_arr_of_recipes_for_display ] = useState([]) ;
            const last_page = useRef(1) ;

            

            



            //_________________________________________________________________________________
                    function handle_btn_back_click(event_info_object) {
                      set_page_num(page_num=> page_num-1)

                    }
            //_________________________________________________________________________________
                    function handle_btn_forward_click(event_info_object) {
                      set_page_num(page_num=> page_num+1)
                    }
            //_________________________________________________________________________________
                    useEffect(function() {
                          
                          if(arr_of_recipes.length) {
                            
                            
                            // console.log(arr_of_recipes.slice(page_num*10-9 , page_num*10+1)) ;
                            // console.log(arr_of_recipes) ;

                            set_arr_of_recipes_for_display(arr_of_recipes.slice(page_num*10-9 , page_num*10+1))
                            last_page.current = (Math.trunc(arr_of_recipes.length/10)) + 1

                            
                          }
                        
                    } , [arr_of_recipes , page_num])



  

  return(

    <section className="section_left">

        <div className="div_display_recipe">

          {check_for_no_results.current ? <p>sorry</p> : is_loading === true ? <p className="text_loading">LOADING...</p> : 
          <ul>
            {arr_of_recipes_for_display.map( val => (
              <li key={val.id}>
                <p>{val.title}</p>
              </li>
            ))}
          </ul>
          
          }

        </div>
        
        {arr_of_recipes.length ?

            <div className="div_next_prev_btn">
                      

            {page_num === 1 ? 
            <div></div> : 
            <button className="btn_back_page page_btn" onClick={(e) => handle_btn_back_click(e)}>&larr; Page <strong>{page_num-1}</strong></button> 
            }
            {page_num === last_page.current ? <div></div> : 
            <button className="btn_forward_page page_btn" onClick={(e) => handle_btn_forward_click(e)}>Page <strong>{page_num+1}</strong> &rarr;</button>
            }
            


            </div>
            :
            <></>

        }

    </section>

  )
}
