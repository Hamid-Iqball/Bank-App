import CreateCustomer from "./features/AccountCustomers/CreateCustomer";
import Customer from "./features/AccountCustomers/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./BalanceDisplay";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
