import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseSummry from "./ExpensesSummary";


const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummry/>
    <ExpenseListFilters/>
    <ExpenseList/>
  </div>
);
export default ExpenseDashboardPage;