import { createSlice } from '@reduxjs/toolkit'
import Emitter from '../Events/Emitter'
import EventName from '../Events/EventName'

const useWishlistSlice = createSlice({
  name: 'Wishlist',
  initialState: {
    WishlistItems: [],
    totalWishlistCount: 0, 
  },
  reducers: {
    addWishlistProduct: {
      reducer: (state, action) => {
        let WishlistIndex = state.WishlistItems.findIndex(
          (item) => item.id === action.payload.id,
        )
        if (WishlistIndex >= 0) {
          //state.WishlistItems[WishlistIndex].quantity += 1
        } else {
          let tempProduct = { ...action.payload, quantity: 1 }
          state.WishlistItems.push(tempProduct)
        }

        Emitter.emit(EventName.ALERT_MESSAGE.SUCCESS,{ message: "Success: You have added product to your Wishlist!"}); 

      },
    },
    getWishlistProducts: (state, action) => {
      return {
        ...state,
      }
    },
    getWishlistCount: (state, action) => {
      let WishlistCount = state.WishlistItems.reduce((total, item) => {
        return item.quantity + total
      }, 0)
      state.totalWishlistCount = WishlistCount
    },
    
    removeWishlistItem: (state, action) => {
      let index = state.WishlistItems.findIndex(
        (item) => item.id === action.payload,
      )
      if (index !== -1) {
        state.WishlistItems.splice(index, 1)
      }
    },
      
  },
})

export const {
  addWishlistProduct,
  getWishlistProducts,
  removeWishlistItem,
  getWishlistCount, 
} = useWishlistSlice.actions

export default useWishlistSlice.reducer
