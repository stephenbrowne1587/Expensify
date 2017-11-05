import { addExpense, editExpense, removeExpense }
 from "../../actions/expenses";

test("should set up remove expense action object", () => {
  const action = removeExpense({ id: "123ddd" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123ddd"
  });
});

test("should set up edit expense action object", () => {
  const action = editExpense("123ddd", {note: "ppp"});
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123ddd",
    updates: {note: "ppp"}
  });
});

test("should set add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "This was last months rent"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("should set add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});