import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

//(1)
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
// (2)
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawl":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.ammount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.ammount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}
// (3)

const rootReducer = combineReducers({
  a: accountReducer,
  b: customerReducer,
});
const store = createStore(rootReducer);
/*
store.dispatch({ type: "account/deposit", payload: 500 });
console.log("hey ");

store.dispatch({ type: "account/withdrawl", payload: 200 });

store.dispatch({
  type: "account/requestLoan",
  payload: { ammount: 1000, purpose: "Buy a new car" },
});
console.log(store.getState());
*/

//(4)
function deposit(ammount) {
  return { type: "account/deposit", payload: ammount };
}
function withdrawl(ammount) {
  return { type: "account/withdrawl", payload: ammount };
}
function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount: ammount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdrawl(200));
store.dispatch(requestLoan(1000, "buy a laptop"));
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Hamid Iqbal", "987635789"));
console.log(store.getState());
store.dispatch(updateName("Hamid khan"));
console.log(store.getState());
