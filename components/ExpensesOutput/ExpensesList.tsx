import { FlatList, Text } from "react-native";
import { Expense } from "./ExpensesOutput";
import { ExpenseItem } from "./ExpenseItem";

interface ExpensesListProps {
    expenses: Expense[];
}   

const renderExpenseItem = (itemData: any) => {
    return <ExpenseItem expense={itemData.item}/>;
}
export const ExpensesList = ({expenses}: ExpensesListProps) => {
    return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id?.toString() || ''}/>;
};