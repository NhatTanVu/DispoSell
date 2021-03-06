import {createSlice, nanoid} from '@reduxjs/toolkit'

export const initialState = {
    "orderDetails": []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserInfo: {
            reducer: function (state, action) {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.contactNumber = action.payload.contactNumber;
                state.address = action.payload.address;
                state.email = action.payload.email;
                state.paymentTransactionID = action.payload.paymentTransactionID;
                state.paymentAmount = action.payload.paymentAmount;
                if (action.payload.user)
                    state.user = action.payload.user;
            },
            prepare(firstName, lastName, contactNumber, address, email, paymentTransactionID, paymentAmount, user) {
                return {
                    payload: {
                        firstName,
                        lastName,
                        contactNumber,
                        address,
                        email,
                        paymentTransactionID,
                        paymentAmount,
                        user
                    }
                }
            }
        },
        addCartItem: {
            reducer: function (state, action) {
                const index = state.orderDetails.findIndex(p => p.product.productID === action.payload.productID);
                if (index > -1) {
                    state.orderDetails[index].quantity += action.payload.quantity;
                } else {
                    state.orderDetails.push({
                        "product": {
                            "productID": action.payload.productID,
                            "productName": action.payload.productName,
                            "productMedia": action.payload.productMedia
                        },
                        "price": action.payload.price,
                        "quantity": action.payload.quantity
                    });
                }
            },
            prepare(productID, productName, productMedia, price, quantity) {
                return {
                    payload: {
                        productID,
                        productName,
                        productMedia,
                        price,
                        quantity
                    }
                }
            }
        },
        removeCartItem: {
            reducer(state, action) {
                const index = state.orderDetails.findIndex(p => p.product.productID == action.payload.productID);
                if (index > -1) {
                    if (state.orderDetails[index].quantity > action.payload.quantity) {
                        state.orderDetails[index].quantity -= action.payload.quantity;
                    } else {
                        state.orderDetails.splice(index, 1);
                    }
                }
            },
            prepare(productID, quantity) {
                return {
                    payload: {
                        productID,
                        quantity
                    }
                }
            }
        },
        clearCart: () => initialState
    }
})

export default cartSlice.reducer

export const {setUserInfo, addCartItem, removeCartItem, clearCart} = cartSlice.actions