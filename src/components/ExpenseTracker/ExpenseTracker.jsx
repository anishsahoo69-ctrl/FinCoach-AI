import { useState } from "react";
import IncomeInput from "./IncomeInput";
import ExpenseInput from "./ExpenseInput";
import ExpenseList from "./ExpenseList";
import ExpenseTotal from "./ExpenseTotal";

const ExpenseTracker = () => {
  const [income, setIncome] = useState(35000);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses((previousExpenses) => [
      expense,
      ...previousExpenses,
    ]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  return (
    <div className="expense-tracker-page">

      <IncomeInput
        income={income}
        onIncomeChange={setIncome}
      />

      <ExpenseTotal
        income={income}
        expenses={expenses}
      />

      <ExpenseInput
        onAddExpense={handleAddExpense}
      />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
      />

    </div>
  );
};

export default ExpenseTracker;