import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    "contactNumber": "1465987722",
    "address": "1465987722 delivery address",
    "email": "onchua2006@gmail.com",
    "status": {
        "statusID": 1
    },
    "orderDetails": []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartInfo: {
            reducer(state, action) {
                state.contactNumber = action.payload.contactNumber;
                state.address = action.payload.address;
                state.email = action.payload.email;
                state.orderDetails = [];
            },
            prepare(contactNumber, address, email) {
                return {
                    payload: {
                        contactNumber,
                        address,
                        email
                    }
                }
            }
        },
        addCartItem: {
            reducer(state, action) {
                state.orderDetails.push({
                    "product": {
                        "productID": action.payload.productID,
                        "productMedia": action.payload.productMedia
                    },
                    "quantity": action.payload.quantity
                });
            },
            prepare(productID, productMedia, quantity) {
                return {
                    payload: {
                        productID,
                        productMedia,
                        quantity
                    }
                }
            }
        },
        removeCartItem: {
            reducer(state, action) {
            },
            prepare() {
                return {
                    payload: {}
                }
            }
        }
    }
})

export default cartSlice.reducer

export const { setCartInfo, addCartItem, removeCartItem } = cartSlice.actions