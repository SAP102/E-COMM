import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { categoryReducer } from "./categoryReducer";
import { myOrdersReducer, newOrderReducer } from "./orderReducer";
import { AllproductReducer, newReviewReducer, productDetailsReducer, productlimitReducer } from "./productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userReducer } from "./userReducer";

const reducer = combineReducers({
    productslimit: productlimitReducer,
    category: categoryReducer,
    allProduct: AllproductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
})

export default reducer