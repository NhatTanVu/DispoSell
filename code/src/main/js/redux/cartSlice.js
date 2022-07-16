import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    "firstName": "",
    "lastName": "",
    "contactNumber": "",
    "address": "",
    "email": "",
    "status": {
        "statusID": ""
    },
    "orderDetails": []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartInfo: {
            reducer: function (state, action) {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.contactNumber = action.payload.contactNumber;
                state.address = action.payload.address;
                state.email = action.payload.email;
                state.orderDetails = [];
            },
            prepare(firstName, lastName, contactNumber, address, email) {
                return {
                    payload: {
                        firstName,
                        lastName,
                        contactNumber,
                        address,
                        email
                    }
                }
            }
        },
        addCartItem: {
            reducer: function (state, action) {
                state.orderDetails.push({
                    "product": {
                        "productID": action.payload.productID,
                        "productMedia": action.payload.productMedia
                    },
                    "price": action.payload.price,
                    "quantity": action.payload.quantity
                });
            },
            prepare(productID, productMedia, price, quantity) {
                return {
                    payload: {
                        productID,
                        productMedia,
                        price,
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

export const {setCartInfo, addCartItem, removeCartItem} = cartSlice.actions