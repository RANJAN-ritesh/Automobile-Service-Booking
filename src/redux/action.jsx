import {ADD_CART, ADD_DATA, FIND_LOCA, INDIVIDUAL} from './actionTypes'

export const addData = (payload)=>{
    return{
        type:ADD_DATA,
        payload
    }
}

export const findLocation = (payload)=>{
    return{
        type:FIND_LOCA,
        payload
    }
}

export const individual = (payload)=>{
    return{
        type:INDIVIDUAL,
        payload
    }
}

export const addCart = (payload)=>{
    return{
        type:ADD_CART,
        payload
    }
}