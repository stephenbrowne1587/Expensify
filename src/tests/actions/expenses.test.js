import { addExpense, 
  editExpense, 
  removeExpense, 
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense }
 from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk])
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref("expenses").set(expensesData).then(() => done());
});

test("should set up remove expense action object", () => {
  const action = removeExpense({ id: "123ddd" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123ddd"
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id
    });
    return database.ref(`expenses/${id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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
  
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense:  expenses[2]
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseDefaults)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    
    
  return database.ref(`expenses/${actions[0].expense.id}`).once("value");   
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    
  return database.ref(`expenses/${actions[0].expense.id}`).once("value");   
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test("should set up set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  })
});
test("should fetch expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

