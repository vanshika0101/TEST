import { INCREMENT } from "../contants";

export const increment=(id)=>{
    return{
        type:INCREMENT,
        payload:id
    }
}