import { type } from "@testing-library/user-event/dist/type";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrnecy":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

export function deposit(ammount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: ammount };

  return async function (dispatch, getState) {
    //API call
    dispatch({ type: "account/convertingCurrnecy" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;
    console.log(converted);

    // return Action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdrawl(ammount) {
  return { type: "account/withdrawl", payload: ammount };
}
export function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount: ammount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
