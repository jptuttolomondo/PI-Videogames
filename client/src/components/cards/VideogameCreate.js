import React ,{useState,useEffect} from "react";
import {Link,useHistory}from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { postVideogame, getGenres,getPlatforms } from "../../actions";
//import  {platformsArray}  from "./platforms";

export  function VideogameCreate(){
const dispatch=useDispatch()
const genres=useSelector((state)=>state.genres)
const plataforma=useSelector((state)=>state.platforms)
//const history=useHistory()
const [input,setInput]=useState({
    name:'',
    description:'',
    released:'',
    platforms:[],
    rating:'',
    genres:[],
    createdInDb:true
})

//const plataforma=platformsArray

useEffect(()=>{
    dispatch(getGenres())
  dispatch(getPlatforms())
},[])

function handleChange(e){
setInput({...input,[e.target.name]:e.target.value})
console.log(input)//e.target.name va a variar dependiendo de en que input este. name, rating, etc

}



function handlePlatforms(e){
    {
     setInput({...input,platforms:[...input.platforms,e.target.value]})//ver como se concatena todos los check en un solo string
    }
    console.log(input.platforms)
    }


function handleSelect(e){

   setInput({...input,genres:[...input.genres,e.target.value]})
}

function handleDeletePlatform(e){
    setInput({...input,platforms:input.platforms.filter(elem=>elem!==e)})
}

function handleDeleteGenre(e){
    setInput({...input,genres:input.genres.filter(elem=>elem!==e)})
}




function handleSubmit(e){
    e.preventDefault()
    console.log(input)
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
  //  history.push('/home')//redirige al usuario a home, el videogame ya se creo
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
    </div>

    <div >
        <label>Description:</label>
    <input 
    type="text"
    value={input.description}
    name="description"
    onChange={handleChange}
    />
    </div>

    <div >
    <label>Released:</label>
    <input 
    type="text"
    value={input.released}
    name="released"
    onChange={handleChange}
    />
    </div>

    <div>
    <label>Rating:</label>
    <input 
    type="text"
    value={input.rating}
    name="rating"
    onChange={handleChange}
    />
    </div>

    <div >
        <label>Imagen:</label>
    <input 
    type="text"
    value={input.background_image}
    name="background_image"
    onChange={handleChange}
    />
    </div>


 
   
     <div>
    <label>Plataformas:</label>
    <select onChange={(e)=>handlePlatforms(e)}>
        <option>seleccionar</option>
        {plataforma.map((elem)=>(
        <option value={elem} key={elem.id}>{elem} </option> 
        ))}
    </select>
    </div>

    <div>
    <label>Generos:</label>
    <select onChange={(e)=>handleSelect(e)}>
        <option>seleccionar</option>
        {genres.map((elem)=>(
        <option value={elem.name} key={elem.id}>{elem.name} </option> 
        ))}
    </select>
    </div>
    <div>
    <label>Plataformas seleccionadas</label>
    <ul>
                        {input.platforms.map(e => (
                            <div>
                                <li >{e}<button
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
                            <div>
                                <li >{e}<button
                                   type="button"
                                    onClick={() => handleDeleteGenre(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
   
</div>

    <button type="submit">Crear videogame</button>
    </form>
</div>
)
}


/*
return(
<div>
<link to='/home'><button>Volver</button></link> 
<h1>crear nuevo videogame</h1>

</div>
)*//*
<ul ><li >{input.genres.map(el=>(
    <div > 
    el + ' ,'
    </div>
    )
    )}</li></ul>
*/

//----------------------------------original--------------------------------------------------------
/*return(
<div>
<h1>crear nuevo videogame</h1>
<Link to='/home'><button>Volver</button></Link> 
<form onSubmit={(e)=>handleSubmit(e)} >
<div >
<label>Name :</label>
<input type="text"
value={input.name}
name="name"
onChange={(e)=>handleChange(e)}
/>
</div>
<div >
<label>Description:</label>
<input type="text"
value={input.description}
name="description"
onChange={(e)=>handleChange(e)}
/>
</div>
<div >
<label>Released:</label>
<input type="text"
value={input.released}
name="released"
onChange={(e)=>handleChange(e)}
/>
</div>


<div>
<label>Rating:</label>
<input type="text"
value={input.rating}
name="rating"
onChange={(e)=>handleChange(e)}
/>
</div>

<div>
<label>Plataformas:</label>
<label>
<input 
type="checkbox"
name="Xbox"
value="Xbox"
onChange={(e)=>handleCheck(e)}
/>Xbox</label>
</div>
<select onChange={(e)=>handleSelect(e)}>
{
    genres.map((elem)=>(
        
              <option value={elem.name}>{elem.name} </option>
     
    ))
}

</select>
<ul ><li >{input.genres.map(el=>(
    <div key={el.id} > 
    el + ' ,'
    </div>
    )
    )}</li></ul>

<button type="submit">Crear videogame</button>
</form>

</div>


)
}
//-------------------------fin original--------------------------------------------------------------







//-----------------copiado------------------------------------------------------------------------

/*import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, getPlatforms, postVideogame } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import styleForm from './VideogameForm.module.css'


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating valid 0 - 5"
    }
    if (!input.released) {
        errors.released = "Complete date"
    } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)) { //eslint-disable-line
        errors.released = "Format error (dd//mm/yy)"
    } else {
        errors.released = ""
    }
    if (input.platforms.length < 1) {
        errors.platforms = "Enter platforms"
    } else {
        errors.platforms = ""
    }
    if (input.genres < 1) {
        errors.genres = "Enter genres"
    } else {
        errors.platforms = ""
    }
    return errors
}


export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        genres: [],
        platforms: []
    })



    //----------Inputs---------
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Select genres----
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
    }
    //-----Select platfroms----
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.platforms]: e.target.value
        }))
    }

    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(postVideogame(input))
            alert("Videojuego Creado!!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                background_image: "",
                genres: [],
                platforms: [] //eslint-disable-line
            })
            history.push('/home')
        }
    }

    //---------Delete genres---------
    function handleGenreDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }

    //---------Delete platforms--------
    function handlePlatformDelete(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())

    }, [dispatch]);




    return (
        <div className={styleForm.background}>
            <h1 className={styleForm.h1}>CREATE GAME</h1>
            <form className={styleForm.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={styleForm.label}>Name</label>
                    <input
                        className={styleForm.inputs}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={styleForm.danger}> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.label}>Rating</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div className={styleForm.danger} > {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.label}>Release Date</label>
                    <input
                        className={styleForm.inputs}
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.released && (
                            <div className={styleForm.danger} > {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label className={styleForm.label} >Image:</label>
                    <input
                        className={styleForm.inputImage}
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label className={styleForm.label} >Description</label>
                    <textarea
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p className={styleForm.danger} > {errors.description} </p>
                        )
                    }
                </div>

                <div className={styleForm.platforms} >
                    <label className={styleForm.labelPlatforms} >Platforms</label>
                    <select  className = {styleForm.platGenreSelect} onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    {input.platforms.map(e => (
                        <div>
                            <li className={styleForm.li}>{e}<button
                                className={styleForm.buttonClose}
                                type="button"
                                onClick={() => handlePlatformDelete(e)}
                            >X</button>
                            </li>
                        </div>
                    ))}
                    {
                        errors.platforms && (
                            <p className={styleForm.danger} > {errors.platforms} </p>
                        )
                    }
                </div >

                <div className={styleForm.genres}>
                    <label className={styleForm.labelGenre} >Genres</label>
                    <select className = {styleForm.platGenreSelect} onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul>
                        {input.genres.map(e => (
                            <div>
                                <li className={styleForm.li}>{e}<button
                                    className={styleForm.buttonClose}
                                    type="button"
                                    onClick={() => handleGenreDelete(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {
                        errors.genres && (
                            <p className={styleForm.danger} > {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ?
                        <p className={styleForm.buttonDanger} >Complete Form</p>
                        :
                        <button
                            type="submit"
                            className={styleForm.button}
                        >ADD VIDEOGAME
                        </button>
                }
            </form>
            <Link to="/home">
                <button className={styleForm.buttonVolver}>Home</button>
            </Link>
        </div>
    )
}*/



//------------checkbox-------------
/*   <div>
    <label>Plataformas:</label>
    <p></p>
   
    <label><input
    type="checkbox"
    name="Xbox 360"
    value="Xbox 360"
    onChange={(e)=>handleCheck(e)}
    />Xbox 360</label>

    <label><input
    type="checkbox"
    name="PlayStation 3" 
    value="PlayStation 3"
    onChange={(e)=>handleCheck(e)}
    />PlayStation 3</label>

    <label><input
    type="checkbox"
    name=   "iOS"
    value=   "iOS"
    onChange={(e)=>handleCheck(e)}
    />iOS</label>

    <label><input
    type="checkbox"
    name=  "Xbox One"
    value= "Xbox One"
    onChange={(e)=>handleCheck(e)}
    />Xbox One</label>

    <label><input
    type="checkbox"
    name= "PC"
    value="PC"
    onChange={(e)=>handleCheck(e)}
    />PC</label>

   <label><input
    type="checkbox"
    name= "Linux"
    value="Linux"
    onChange={(e)=>handleCheck(e)}
    />Linux</label>

    <label><input
    type="checkbox"
    name= "macOS"
    value="macOS"
    onChange={(e)=>handleCheck(e)}
    />macOS</label>

     </div>


     function handleCheck(e){
if(e.target.checked){
 setInput({...input,platforms:[...input.platforms,e.target.value]})//ver como se concatena todos los check en un solo string
}

}
    */




/*--------mostar y borrar listas original---------------
 <ul >
        <li>{input.genres.map(el=>(<div key={el.id}>{el + ","}</div>))}</li></ul>
    <button>Quitar ultima seleccion de Genero</button>*/