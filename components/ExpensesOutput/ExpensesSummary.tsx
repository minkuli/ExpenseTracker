import { View, Text, StyleSheet } from "react-native";
import { Expense } from "./ExpensesOutput";
import { GlobalStyles } from "../../constants/styles";

interface ExpensesSummaryProps {
  expenses: Expense[];
  expensesPeriod: string;
}

export const ExpensesSummary = ({
  expenses,
  expensesPeriod,
}: ExpensesSummaryProps) => {
  const expensesSum = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500
    }
    });
