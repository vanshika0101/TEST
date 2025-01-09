// addcartaction.js
import { ADD_TO_CART } from '../contants';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,// additional info
});
