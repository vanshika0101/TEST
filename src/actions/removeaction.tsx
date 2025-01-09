


import {DELETE_ITEM_FROM_CART} from '../contants';
export const deleteItemFromCart = (productId) => {
    console.log(productId);
    
    return {
        type: DELETE_ITEM_FROM_CART,
        payload: productId, 
      
        
    };
    
};


