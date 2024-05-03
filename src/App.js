



export default function App() {

  return(
    <div className="div_containing_everything">


      <main className="main_box">

        <HEADER_COMPONENT></HEADER_COMPONENT>


        <section className="section_left_right_both"></section>

      </main>




    </div>
  )
}


function HEADER_COMPONENT() {

  return(

    <header className="section_header">

      <div className="div_forkify_logo">
        <img className="img_forkify_logo" src="forkify_logo.png" alt="img"/>
      </div>


      <div className="div_search_bar">
         <form className="form_input_search_bar">


           <input className="input_search_bar" placeholder="Search recipe"/>
           
         <button className="btn_search">
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
}