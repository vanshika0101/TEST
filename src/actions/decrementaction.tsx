import { DECREMENT } from "../contants";
export const decrement =(id)=>{
    return {
        type:DECREMENT,
        payload:id,
    }
}