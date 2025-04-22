import axios from "axios";
import { Expense } from "../components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL =
  "https://react-native-course-e6b35-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expense: Expense) => {
  try {
    const response = await axios.post(BACKEND_URL + "/expenses.json", expense);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");

    const expenses = [];
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.error(error);
  }
};

export const updateExpense = (id: string, expense: Expense) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expense);
};

export const deleteExpense = (id: string) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
