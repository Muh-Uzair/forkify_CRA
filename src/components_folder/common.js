

export const API_KEY = `d84478c6-6132-4c64-b5fa-2427ec2eac58` ;


export function RECIPE_LIST({
    
    arr_of_recipes ,
    handle_recipe_click ,
    clicked_id ,
    
    }){
    
    
      return(
    
        <ul className="ul_recipe_list">
                  {arr_of_recipes.map(val => (
                    <li key={val.id}
                      onClick={(e) => handle_recipe_click(e, val)}
                      style={clicked_id === val.id ? { backgroundColor: "#ffa43b2a" } : {}}
                    >
    
                            <div className="div_recipe_img">
                              <img className="img_recipe" src={val.image_url} alt="img" />
                            </div>
    
                            <div className="div_recipe_name_plus_channel">
    
                                    <p className="text_recipe_title">{val.title}</p>
                                    <p className="text_channel_name">{val.publisher}</p>
                                    
    
                            </div>
    
                            <div className="div_my_recipe">
                                                                  
                                    {val.key === API_KEY 
                                    ?
                                    <div className="div_person_icon">
                                        <img className="img_person_icon" src="person_icon.png" alt="img"/>
                                    </div> 
                                      : 
                                      <></>
                                      }
                            </div>
                      
    
                    </li>
                  ))}
        </ul>
    
      )
    
    }