 import {ADD_CART, ADD_DATA, FIND_LOCA, INDIVIDUAL} from './actionTypes';
 const initState = {
  allData:[],
  locationFilter:[],
  shopid:-1,
  cart:{}
}
export const reducer = (state = initState, {type,payload}) => {
    switch (type) {
        case ADD_DATA:{
            return{
                ...state,
                allData:[...state.allData,payload]
            }
        }
        case FIND_LOCA:{
            return{
                ...state,
                locationFilter:[payload]
            }
        }
        case INDIVIDUAL:{
            return{
                ...state,
                shopid:payload
            }
        }
        case ADD_CART:{
            return{
                ...state,
                cart:payload
            }
        }
         default:
            return state;
    }
}