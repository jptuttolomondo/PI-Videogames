import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";

export default function SearchBar(){

const dispatch=useDispatch()
const [name,setName]=useState("")

function handleInputChange(e){
   console.log(e.target.value) 
e.preventDefault()
setName(e.target.value)
console.log(name)

}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameVideogames(name))

}
return (
<div>
<input type='text'
placeholder='buscar...'
onChange={(e)=>handleInputChange(e)} />
<button type='submit' onClick={(e)=>handleSubmit(e)}>buscar</button>

</div>

)
}