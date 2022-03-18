import axios from 'axios'

export function getAllVideogames(){
return async function (dispatch){
    var response= await axios.get('http://localhost:3001/videogames')
    //console.log(response.data)
    //console.log(response.data[0].genres[0].name)
    return dispatch({type: 'GET_ALL_VIDEOGAMES', payload:response.data})
}
}


 export function filterVideosByGenre(payload){
     return {
         type:'FILTER_BY_GENRE',payload
     }
 }

export function filterCreated(payload){
    return {type:'FILTER_CREATED',payload}
}

export function orderByName(payload){
    return{type:'ORDER_BY_NAME',payload}
}

export function getNameVideogames(name){
    return async function (dispatch){
        try{
           // console.log(name)
            var json=await axios.get('http://localhost:3001/videogames?name='+ name)
            //console.log(json)
            return dispatch({type:'GET_NAME_VIDEOGAME',payload:json.data})

        }
        catch(error){alert('no existe el videogame')}
    }
}


export function getGenres(){
    return async function(dispatch){
        var info= await axios.get('http://localhost:3001/genres')
        return dispatch({type:'GET_GENRES',payload:info.data})
    }
}


export function getPlatforms(){
    return async function(dispatch){
        var info= await axios.get('http://localhost:3001/platforms')
        console.log('plataformas:',info)
        return dispatch({type:'GET_PLATFORMS',payload:info.data})  
        
    }
  
}


export function postVideogame(payload){
    return async function(dispatch){
        console.log('payload:  ',payload)
        var result= await axios.post('http://localhost:3001/videogame',payload)
        console.log('resultado: ',result)
        return result
    }
}


export function getDetail(id){
    return async function(dispatch)
    {
        try{
            var json= await axios.get('http://localhost:3001/videogame/'+ id)
            return dispatch({type:'GET_DETAIL',payload:json.data})

        }
        catch(error){console.log(error)}

    }
}