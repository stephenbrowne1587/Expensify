import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render expense summary with one expenses", () => {
  const wrapper = shallow(<ExpenseSummary
     expenseCount={1} expensesTotal={195}/>)
  expect(wrapper).toMatchSnapshot();
});

test("Should render expenses summary with multiple expenses", () => {
  const wrapper = shallow(<ExpenseSummary
     expenseCount={23} expensesTotal={19234123141235}/>)
  expect(wrapper).toMatchSnapshot();
});

