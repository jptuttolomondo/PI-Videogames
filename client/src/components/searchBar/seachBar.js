import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideogames,cleanSearch } from "../../actions";
import searchBarStyle from'./searchBar.module.css'


export default function SearchBar(){

const dispatch=useDispatch()

const [name,setName]=useState("")
// useEffect(()=>{
//     dispatch(cleanSearch())

// },[dispatch])


function handleInputChange(e){
e.preventDefault()
setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameVideogames(name))

}
return (
<div className={searchBarStyle.bloque}>
    
<label className={searchBarStyle.letra}>Buscar por Nombre</label>
<input type='text'
placeholder='Buscar videogame...'
onChange={(e)=>handleInputChange(e)}  className={searchBarStyle.inputSearch}/>
<button type='submit' onClick={(e)=>handleSubmit(e)} className={searchBarStyle.buttonSearch}>Buscar</button>

</div>

)
}