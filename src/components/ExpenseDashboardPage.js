import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseSummary from "./ExpensesSummary";
import Header from "./Header";


const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary/>
    <ExpenseListFilters/>
    <ExpenseList/>
  </div>
);
export default ExpenseDashboardPage;