import React ,{useState,useEffect} from "react";
import {Link}from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { postVideogame, getGenres,getPlatforms } from "../../actions";
import formatCreate from'./VideogameCreate.module.css'

export  function VideogameCreate(){
const dispatch=useDispatch()
const genres=useSelector((state)=>state.genres)
const plataforma=useSelector((state)=>state.platforms)
const [errors,setErrors]=useState({})

const [input,setInput]=useState({
    name:'',
    description:'',
    released:'',
    platforms:[],
    background_image:'',
    rating:'',
    genres:[],
    createdInDb:true
})

//const plataforma=platformsArray

useEffect(()=>{
    dispatch(getGenres())
  dispatch(getPlatforms())
},[dispatch])


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    else if(! (/^[A-Z]+$/i.test(input.name))) errors.name="El nombre debe contener solo letras"
         else {if(! (/^[A-Z]+$/i.test(input.name))) errors.name="El nombre debe comenzar con mayúsculas"
                if(! (/^[A-Z][a-z]+$/.test(input.name))) errors.name="El nombre debe comenzar con mayúsculas seguido de todas minúsculas,sin espacios"
         }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating valid 0 - 5"
    }
    if (!input.released) {
        errors.released = "Complete date"
                        } 
                        else{ 
                      
                    
                    if (!(/^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(0[0-9]|1[0-9]|2[0-2]|8[0-9]|9[0-9])$/.test(input.released)))  //eslint-disable-line
             errors.released = "Format error (dd-mm-yy). Ingresar fecha valida"
             else {
             errors.released = ""
                 }
                        }

if(!input.background_image)errors.background_image="ingresar url "
else 
    if(!(/^(http|https):\/\/[a-z0-9.-]+\.[a-z]{2,4}/gi.test(input.background_image)) )errors.background_image='ingresar url valida'
  

    if (input.platforms.length < 1) {
        errors.platforms = "Enter platforms"
    } else {
        errors.platforms = ""
    }
    if (input.genres.length<1) {console.log('input.genres:',input.genres.lenght)
        errors.genres = "Enter genres"
    } else {
        errors.genres = ""
    }
    return errors
}


function handleChange(e){
setErrors(validate({...input,[e.target.name]:e.target.value}))
setInput({...input,[e.target.name]:e.target.value})

//console.log(input)//e.target.name va a variar dependiendo de en que input este. name, rating, etc

}


/*
function handlePlatforms(e){
    
        setErrors(validate({...input,platforms:[...input.platforms,e.target.value]}))
     setInput({...input,platforms:[...input.platforms,e.target.value]})//ver como se concatena todos los check en un solo string
    
    }
*/

function handleSelect(e){
    setErrors(validate({...input,genres:[...input.genres,e.target.value]}))
   setInput({...input,genres:[...input.genres,e.target.value]})
}

function handleDeletePlatform(e){
    console.log('e:  ',e)
    console.log('dentro de hNDLE ANTES DEL FFILTRIO',input.platforms)
    setInput({...input,platforms:input.platforms.filter(elem=>elem!==e)})
   console.log('dentro de hNDLE despues DEL FFILTRIO',input.platforms)
}
// function handleDeletePlatform(e){
//     setInput({...input,platforms:input.platforms.filter(elem=>elem!==e)})
// }


function handleDeleteGenre(e){
    setInput({...input,genres:input.genres.filter(elem=>elem!==e)})
}
      
function handlecheck(e){
   // console.log(e.target.value)
    setErrors(validate({...input,platforms:[...input.platforms,e.target.value]}))
    if(e.target.checked){
        console.log('checked: ',e.target.checked)
        setInput({...input,platforms:[...input.platforms,e.target.value]})
       // console.log('final :',input.platforms)
    }

    
    else {      console.log('platform antes delete: ',input.platforms)
    console.log('checked: ',e.target.checked)
    
     handleDeletePlatform(e)
       // console.log('lenght de platforms: ',input.platforms.length)
       
     
}
 setErrors(validate({...input,platforms:[...input.platforms,e.target.value]}))
}

function handleSubmit(e){
    if (input.name === "") {
        e.preventDefault()
        alert("Completar correctamente el formulario")
    } else {
    e.preventDefault()
    //console.log(input)
    dispatch(postVideogame(input))
    alert('videogame creado..')
    setInput({
        name:'',
        description:'',
        released:'',
        platforms:[],
        rating:'',
        background_image:'',
        genres:[],
        createdInDb:true
    })

}

}
return(
<div className={formatCreate.createBody}>
    <div className={formatCreate.createCard} >


    
    
    <Link to='/home' ><button className={formatCreate.closeIcon}title="Volver a Home">X</button></Link>
     <div className={formatCreate.createTitle} >Crear nuevo videogame</div>
    <form onSubmit={(e)=>handleSubmit(e)} >
    <div  >
        <label className={formatCreate.createData}>Name :</label>
        <input className={formatCreate.inputCreate}
        type="text"
        value={input.name} 
        name="name"
        onChange={handleChange}
        />
         { errors.name && (<p className={formatCreate.createValid}> {errors.name} </p> )}
    </div>

    <div >
        <label className={formatCreate.createData}>Description:</label>
    <textarea className={formatCreate.inputDescriptionCreate} 
    type="text"
    value={input.description}
    name="description"
    onChange={handleChange}
    rows="2" cols="20"
    />
    { errors.description&&(<p className={formatCreate.createValid}>{errors.description}</p>) }
    </div>

    <div >
    <label className={formatCreate.createData}>Released:</label>
    <input className={formatCreate.inputCreate} 
    type="text"
    value={input.released}
    name="released"
    onChange={handleChange}
    />
    {errors.released&&(<p className={formatCreate.createValid}>{errors.released}</p>)}
    </div>

    <div>
    <label className={formatCreate.createData}>Rating:</label>
    <input className={formatCreate.inputCreate}
    type="number"
    value={input.rating}
    name="rating"
    onChange={handleChange}
    />
    {errors.rating&&(<p className={formatCreate.createValid}>{errors.rating}</p>)}
    </div>

    <div >
        <label className={formatCreate.createData}>Imagen:</label>
    <input className={formatCreate.inputCreate}
    type="url"
    value={input.background_image}
    name="background_image"
    onChange={handleChange}
    />
    {errors.background_image&&(<p className={formatCreate.createValid}>{errors.background_image}</p>)}
    </div>
{/*aqui va select de plataformass*/}
    <div>
  
     <label className={formatCreate.createData}>Plataformas:</label><p></p>
  

        <label >Android
    <input type="checkbox"
    name="Android"
    value="Android" 
     onChange={e=>handlecheck(e)}
   
    />


<label >PC 
    <input type="checkbox"
    name="PC"
    value="PC"
    onChange={e=>handlecheck(e)}
    />
     
    </label> 
    
      <label >Xbox 360 
    <input type="checkbox"
    name="Xbox 360"
    value="Xbox 360"
    onChange={e=>handlecheck(e)}
    />
   
    </label> 

        <label >PlayStation 5 
    <input type="checkbox"
    name="PlayStation 5"
    value="PlayStation 5"
    onChange={e=>handlecheck(e)}
    onClick={e=>handleDeletePlatform(e)}
    />
  
    </label> 

     { errors.platforms && (<p className={formatCreate.createValid}> {errors.platforms} </p> )}
    </label> 
    
   </div>
    <div>
  
    <label className={formatCreate.createData}>Seleccionar Generos:</label>
    <select onChange={(e)=>handleSelect(e)} className={formatCreate.box}>
        <option value='#'>seleccionar</option>
     
        {genres.map((el)=>(
         <option value={el.name} key={el.id}>{el.name} </option> 
              ))}
    </select>
    <p></p>    <p></p>
    { errors.genres && (<p className={formatCreate.createValid}> {errors.genres} </p> )}
    </div>

{/*aui va plaataformas seleccionadas*/}

 <div>
    <label className={formatCreate.createData}>Plataformas seleccionadas</label>
    <ul>
                        {input.platforms.map(e => (
                          
                                <li key={e}className={formatCreate.lista}>{e} <button className={formatCreate.closeIcon1}
                                   type="button"
                                    onClick={() => handleDeletePlatform(e)}
                                > X</button>
                                </li>
                      
                        ))}
                    </ul>
   
</div>

 
<div>
    <label className={formatCreate.createData}>Generos seleccionados</label>
    <ul>
                        {input.genres.map(e => (
                         
                                <li  key={e} className={formatCreate.lista}>{e}<button className={formatCreate.closeIcon1}
                                   type="button"
                                    onClick={() => handleDeleteGenre(e)}
                                >X</button>
                                </li>
                
                        ))}
                    </ul>
   
</div>
   {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms|| errors.released || errors.background_image) ?
                        <p className={formatCreate.createValid} >Complete Form</p>
                        :
                         <button type="submit" className={formatCreate.button1}>Crear videogame</button>   
                }

    </form>
</div>
</div>
)
}



/* <div> plñaatadorrmas selecciionadas
    <label className={formatCreate.createData}>Plataformas seleccionadas</label>
    <ul>
                        {input.platforms.map(e => (
                          
                                <li key={e}className={formatCreate.lista}>{e} <button className={formatCreate.closeIcon1}
                                   type="button"
                                    onClick={() => handleDeletePlatform(e)}
                                > X</button>
                                </li>
                      
                        ))}
                    </ul>
   
</div>*/

/*
<div>
    <label className={formatCreate.createData}>Plataformas:</label>
    <select onChange={(e)=>handlePlatforms(e)} className={formatCreate.box}>
        <option value='#'>seleccionar</option>
        
        {plataforma.map((elem)=>(
        <option value={elem} key={elem}>{elem} </option> 
        ))}
    </select>
    { errors.platforms && (<p> {errors.platforms} </p> )}
    </div>
 
   
    <div></div>
    */




    /*<label >PC 
    <input type="checkbox"
    name="PC"
    value="PC"
    onChange={e=>handlecheck(e)}
    />
     
    </label> 
    
      <label >Xbox 360 
    <input type="checkbox"
    name="Xbox 360"
    value="Xbox 360"
    onChange={e=>handlecheck(e)}
    />
   
    </label> 

        <label >PlayStation 5 
    <input type="checkbox"
    name="PlayStation 5"
    value="PlayStation 5"
    onChange={e=>handlecheck(e)}
    />
  
    </label> */