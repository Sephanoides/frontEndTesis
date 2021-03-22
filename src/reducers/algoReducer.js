import { reduxState } from "../types/redux-state";


// {
//     num_usuarios: '',
//     num_items: '',
//     num_aspects: ''
// }


export const algoReducer = ( state = {}, action ) =>{


    switch (action.type) {
        case reduxState.dataset:
            
            return{
                usuarios: action.payload.usuarios,
                items: action.payload.items,
                aspectos: action.payload.aspectos,
                PR: action.payload.PR,
            }
    
        default:
            return state
    }

}