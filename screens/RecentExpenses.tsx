import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import {
  Expense,
  ExpensesOutput,
} from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

interface RecentExpensesProps {}

export const RecentExpenses: React.FC<RecentExpensesProps> = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpensesFromServer() {
      setIsFetching(true);
      try {
        const expenses: Expense[] | undefined = await fetchExpenses();
        if (expenses) expensesCtx?.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    fetchExpensesFromServer();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    console.log("Error", error);
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  const recentExpenses = expensesCtx?.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);
    return expense.date >= sevenDaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No recent expenses"
    />
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
