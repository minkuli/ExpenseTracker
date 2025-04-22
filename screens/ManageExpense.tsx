import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { Expense } from "../components/ExpensesOutput/ExpensesOutput";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

interface ManageExpenseProps {
  route: any;
  navigation: any;
}

export const ManageExpense = ({ route, navigation }: ManageExpenseProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId; // !! converts to boolean, this is true if editing and false otherwise

  const selectedExpense = expensesCtx?.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx?.removeExpense(editedExpenseId);
      navigation.goBack();

    } catch (error) {
      setError("Could not delete expense!");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if(error && !isSubmitting) {
    console.log("Error", error);
    return <ErrorOverlay message={error} onConfirm={cancelHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const confirmHandler = async (expenseData: Expense) => {
    setIsSubmitting(true);
    if (isEditing) {
      expensesCtx?.updateExpense(editedExpenseId, expenseData);
      console.log("Expense updated", editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx?.addExpense({ ...expenseData, id: id });
    }
    console.log("going back");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
