import axios from 'axios'

export function getAllVideogames(){
return async function (dispatch){
    var response= await axios.get('/videogames')
    console.log('entra a getallvideogames')
       return dispatch({type: 'GET_ALL_VIDEOGAMES', payload:response.data})
}
}

export function filterVideosByPlatform(payload){
   // console.log(payload)
    return {
     
        type:'FILTER_BY_PLATFORM',payload
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

export function orderByRating(payload){
    return{type:'ORDER_BY_RATING',payload}
}

export function getNameVideogames(name){
    return async function (dispatch){
        try{
             var json=await axios.get('/videogames?name='+ name)
             return dispatch({type:'GET_NAME_VIDEOGAME',payload:json.data})
       }
        catch(error){alert('no existe el videogame')}
    }
}

export function getGenres(){
    return async function(dispatch){
        var info= await axios.get('/genres')
        return dispatch({type:'GET_GENRES',payload:info.data})
    }
}


export function getPlatforms(){
    return async function(dispatch){
        var info= await axios.get('/platforms')
        return dispatch({type:'GET_PLATFORMS',payload:info.data})  
     }
  }

export function cleanDetail(){
    return async function(dispatch){
        return dispatch({type:'CLEAN_DETAIL',payload:[]})
    }
}

export function cleanSearch(){
    return async function(dispatch){
        return dispatch({type:'CLEAN_SEARCH',payload:[]})
    }
}

export function cleanStates(){
    return async function(dispatch){
        return dispatch({type:'CLEAN_STATES',payload:[]})
    }
}

export function postVideogame(payload){
    return async function(dispatch){
      var result= await axios.post('/videogame',payload)
       return result
    }
}

export function getDetail(id){
    return async function(dispatch)
    {
        try{
            var json= await axios.get('/videogame/'+ id)
            return dispatch({type:'GET_DETAIL',payload:json.data})
        }
        catch(error){alert('videogame no existe')
        window.location.replace('/home')
          
          }
    }
}