import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {startEditExpense,
        startRemoveExpense
        } from "../actions/expenses";
import Header from "./Header";

export class EditExpensePage extends React.Component {
  onRemove = () => {
    // this.props.dispatch(removeExpense({id: this.props.expense.id}))
    this.props.startRemoveExpense({id: this.props.expense.id});
    this.props.history.push("/dashboard");
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/dashboard");
  }
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>  
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => 
  expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
  startEditExpense: (id, expense) => dispatch(startEditExpense( id,expense))
});

export default connect(
  mapStateToProps, mapDispatchToProps)( EditExpensePage);