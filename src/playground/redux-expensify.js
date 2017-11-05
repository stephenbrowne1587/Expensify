import {createStore, combineReducers} from "redux";
import uuid from "uuid";

const addExpense = (
  {
    description = "", 
    note = "", 
    amount = 0, 
    createdAt = 0
  } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({id} = {} ) => ({
  type: "REMOVE_EXPENSE",
  id: id
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate
});
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [
        ...state,
        action.expense
      ];
    case "REMOVE_EXPENSE":
      return state.filter(( {id} ) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((exp) => {
        if (exp.id === action.id) {
          return {
            ...exp,
            ...action.updates
          }
        }else{
          return exp;
        }
      });
    default: 
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type){
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = 
  (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter((expense) => {
      const startDateMatch = typeof startDate !== "number" ||
         expense.createdAt >= startDate;

      const endDateMatch = typeof endDate !== "number" ||
        expense.createdAt <= endDate;
      const textMatch =
        expense.description.toLowerCase().includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(
    state.expenses, state.filters);
  console.log(visibleExpenses);
});
store.dispatch(setTextFilter("e"));

const expense1 = store.dispatch(
  addExpense({description: "Rent", amount: 10, createdAt: 10}));
const expense2 = store.dispatch(
  addExpense({description: "Coffee", amount: 1400, createdAt:-100440}));
const expense3 = store.dispatch(
  addExpense({description: "Rent", amount: 10044, createdAt: 10044440}));
const expense4 = store.dispatch(
  addExpense({description: "Coffee", amount: 140440, createdAt:-100}));
const expense5 = store.dispatch(
  addExpense({description: "Rent", amount: 1300, createdAt: 10040}));
const expense6 = store.dispatch(
  addExpense({description: "Coffee", amount: 1400, createdAt:-1003333330}));
      
// store.dispatch(removeExpense({id: expense1.expense.id}));
// store.dispatch(editExpense(expense2.expense.id, {amount: 54400}))

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));


const demoState = {
  expenses: [{
    id: "ass head",
    description: "January Reant",
    note: "This was the fuck of the shit",
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "date", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  name: "Jen",
  age: 24
};

// console.log({
//   ...user,
//   location: "Toronot",
//   name: "Stephen"
// });
