import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/AccountCustomers/CustomerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
