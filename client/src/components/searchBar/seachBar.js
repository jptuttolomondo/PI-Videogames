import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions";
import searchBarStyle from'./searchBar.module.css'


export default function SearchBar(){

const dispatch=useDispatch()
const [name,setName]=useState("")

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
<input type='text'
placeholder='Buscar videogame...'
onChange={(e)=>handleInputChange(e)}  className={searchBarStyle.inputSearch}/>
<button type='submit' onClick={(e)=>handleSubmit(e)} className={searchBarStyle.buttonSearch}>Buscar</button>

</div>

)
}