import React ,{useState,useEffect} from "react";
import {Link}from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { postVideogame, getGenres,getPlatforms } from "../../actions";


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
                      
                    
                    if (!(/^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(0[0-9]|1[0-9]|2[0-9])$/.test(input.released)))  //eslint-disable-line
             errors.released = "Format error (dd-mm-yy). Ingresar fecha valida"
             else {
             errors.released = ""
                 }
                        }

if(!input.background_image)errors.background_image="ingresar url "
else 
    if(!(/^(http|https)\/\/[a-z0-9-]+\.[a-z]{2,4}/gi.test(input.background_image)) )errors.background_image='ingresar url valida'


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



function handlePlatforms(e){
    
        setErrors(validate({...input,platforms:[...input.platforms,e.target.value]}))
     setInput({...input,platforms:[...input.platforms,e.target.value]})//ver como se concatena todos los check en un solo string
    
   // console.log(input.platforms)
    }


function handleSelect(e){
    setErrors(validate({...input,genres:[...input.genres,e.target.value]}))
   setInput({...input,genres:[...input.genres,e.target.value]})
}

function handleDeletePlatform(e){
    setInput({...input,platforms:input.platforms.filter(elem=>elem!==e)})
}

function handleDeleteGenre(e){
    setInput({...input,genres:input.genres.filter(elem=>elem!==e)})
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
<div>
    <h1>crear nuevo videogame</h1>
    <Link to='/home'><button>Volver</button></Link> 
    <form onSubmit={(e)=>handleSubmit(e)} >
    <div >
        <label>Name :</label>
        <input 
        type="text"
        value={input.name} 
        name="name"
        onChange={handleChange}
        />
         { errors.name && (<p> {errors.name} </p> )}
    </div>

    <div >
        <label>Description:</label>
    <textarea
    type="text"
    value={input.description}
    name="description"
    onChange={handleChange}
    rows="5" cols="45"
    />
    { errors.description&&(<p>{errors.description}</p>) }
    </div>

    <div >
    <label>Released:</label>
    <input 
    type="text"
    value={input.released}
    name="released"
    onChange={handleChange}
    />
    {errors.released&&(<p>{errors.released}</p>)}
    </div>

    <div>
    <label>Rating:</label>
    <input 
    type="number"
    value={input.rating}
    name="rating"
    onChange={handleChange}
    />
    {errors.rating&&(<p>{errors.rating}</p>)}
    </div>

    <div >
        <label>Imagen:</label>
    <input 
    type="url"
    value={input.background_image}
    name="background_image"
    onChange={handleChange}
    />
    {errors.background_image&&(<p>{errors.background_image}</p>)}
    </div>

    <div>
    <label>Plataformas:</label>
    <select onChange={(e)=>handlePlatforms(e)} >
        <option>seleccionar</option>
        {plataforma.map((elem)=>(
        <option value={elem} key={elem}>{elem} </option> 
        ))}
    </select>
    { errors.platforms && (<p> {errors.platforms} </p> )}
    </div>
 
   
    <div>
    <label>Generos:</label>
    <select onChange={(e)=>handleSelect(e)}>
        <option>seleccionar</option>
        {genres.map((el)=>(
         <option value={el.name} key={el.id}>{el.name} </option> 
              ))}
    </select>
    { errors.genres && (<p> {errors.genres} </p> )}
    </div>


    <div>
    <label>Plataformas seleccionadas</label>
    <ul>
                        {input.platforms.map(e => (
                            <div key={e.id}>
                                <li key={e.id}>{e}<button
                                   type="button"
                                    onClick={() => handleDeletePlatform(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
   
</div>
<div>
    <label>Generos seleccionados</label>
    <ul>
                        {input.genres.map(e => (
                            <div key={e.id}>
                                <li  >{e}<button
                                   type="button"
                                    onClick={() => handleDeleteGenre(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
   
</div>
   {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms|| errors.released || errors.background_image) ?
                        <p >Complete Form</p>
                        :
                         <button type="submit">Crear videogame</button>   
                }

    </form>
</div>
)
}


/*

  */


