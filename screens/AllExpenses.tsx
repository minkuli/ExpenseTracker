import { View, Text, StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import React, { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

interface AllExpensesProps {}

export const AllExpenses: React.FC<AllExpensesProps> = (props) => {
   const expensesCtx =  useContext(ExpensesContext);
  return (
      <ExpensesOutput expenses={expensesCtx?.expenses} expensesPeriod="All" fallbackText="You don't have any expenses."/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
