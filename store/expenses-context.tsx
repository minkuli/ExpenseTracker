import React, { createContext, useReducer } from "react";
import { Expense } from "../components/ExpensesOutput/ExpensesOutput";

interface ExpenseData {
  description: string;
  amount: number;
  date: Date;
}
interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: ExpenseData) => void;
}

export const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

type ExpensesAction =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "SET_EXPENSES"; payload: Expense[] }
  | { type: "REMOVE_EXPENSE"; payload: string }
  | { type: "UPDATE_EXPENSE"; payload: { id: string; expenseData: ExpenseData } };

const expensesReducer = (state: Expense[], action: ExpensesAction) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "SET_EXPENSES":
      const inverted = action.payload.reverse();
      return inverted;
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE_EXPENSE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.expenseData }
          : expense
      );

    default:
      return state;
  }
};

interface ExpensesProviderProps {
  children: React.ReactNode;
}

const ExpensesProvider: React.FC<ExpensesProviderProps> = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = ({id, description, date, amount }: Expense) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: id ? id : Math.random().toString(),
        description,
        date,
        amount,
      },
    });
  };
  const setExpenses = (expenses: Expense[]) => {
    dispatch({
      type: "SET_EXPENSES",
      payload: expenses,
    });
  };
  const removeExpense = (id: string) => {
    dispatch({
      type: "REMOVE_EXPENSE",
      payload: id,
    });
  };
  const updateExpense = (id: string, expenseData: ExpenseData) => {
    if (!id) {
      console.error("updateExpense requires an expense with an id.");
      return;
    }

    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id, expenseData },
    });
  };

  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    removeExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
