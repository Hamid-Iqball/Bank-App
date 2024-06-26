import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store";
import "./index.css";
import App from "./App";
import { type } from "@testing-library/user-event/dist/type";

// store.dispatch({ type: "account/deposit", payload: 250 });

// store.dispatch({
//   type: "customer/createCustomer",
//   payload: { fullName: "Hamid Iqbal", nationalId: 171030445052 },
// });

console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
