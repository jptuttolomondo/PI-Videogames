import React from "react";

export default function Card({name,image,genres,id}){
return(
<div key={id}>
<h3>{name}</h3>
<h5>{genres}</h5>

<img src={image} alt='' whith="200px" height="200px"/>

</div>

)


}