import { Pressable, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "./ExpensesOutput";
import { getFormattedDate } from "../../utils/date";

interface ExpenseItemProps {
  expense: Expense;
}

type RootstackParamList = {
  ManageExpense: {expenseId: string};
};
type NavigationProp = NativeStackNavigationProp<RootstackParamList, "ManageExpense">;

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  console.log("ExpenseItem", expense);
  const { description, date, amount } = expense;
  const navigation = useNavigation<NavigationProp>();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: expense.id || "" });
  };
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      <View style={styles.expenseContainer}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
