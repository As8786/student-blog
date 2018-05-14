import {combineReducers} from 'redux'

const articles = (state = [], action) => {
    switch(action.type) {
        case "ADD_ARTICLES" :
            return state=action.data
        default :
            return state
    }
}

const connectedUser = (state={}, action) => {
    switch(action.type){
        case "ADD_USER" :
            return state = action.data
        case "LOG_OUT" :
            return state = {}    
        default : 
            return state    
    } 
}


const currentArticle = (state, action) => {
    switch(action.type) {
        case "SET_CURRENT_ARTICLE_VALUE" :
         return state = action.data
        default : 
         return state || {
            id : "",
            image : "",
            title: "",
            date : "",
            content : "",
            writer : "",
            category : "",
            comments : []
        }
    }
}

const searchResult = (state, action) => {
    switch(action.type) {
        case "SET_SERACH_RESULT_VALUE" :
            state = action.data
        default:
            return state || {
                id : "",
                image : "",
                title: "",
                date : "",
                content : "",
                writer : "",
                category : "",
                comments : []
            }    
    }
}

const isSearchBarDisplayed = (state, action) =>{
    switch(action.type) {
        case "DISPLAY_SEARCH" :
            return state = !state
        default :
            return state || false    
    }
}




const Reducers = combineReducers({
    articles,
    currentArticle,
    connectedUser,
    searchResult,
    isSearchBarDisplayed
})

export default Reducers