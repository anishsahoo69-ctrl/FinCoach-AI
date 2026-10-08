import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "fincoach-finance-state";

const defaultProfile = {
  name: "Anish",
  email: "anish@fincoach.ai",
  phone: "+91 98765 43210",
  occupation: "Student",
  monthlyIncome: 35000,
  monthlyBudget: 25000,
  savingsTarget: 20000,
  preferredCurrency: "INR",
};

const defaultState = {
  income: 35000,
  expenses: [
    {
      id: "exp-1",
      name: "Groceries",
      amount: 1800,
      category: "Food",
      date: "2026-10-02",
    },
    {
      id: "exp-2",
      name: "Metro Pass",
      amount: 1200,
      category: "Travel",
      date: "2026-10-04",
    },
    {
      id: "exp-3",
      name: "Course Book",
      amount: 2200,
      category: "Study",
      date: "2026-10-06",
    },
    {
      id: "exp-4",
      name: "Medicine",
      amount: 950,
      category: "Medicines",
      date: "2026-10-07",
    },
  ],
  budget: 25000,
  investments: [
    {
      id: "inv-1",
      name: "Growth Fund",
      type: "Mutual Funds",
      amount: 8000,
      returnRate: 8.5,
      date: "2026-08-10",
    },
    {
      id: "inv-2",
      name: "Blue Chip Stocks",
      type: "Stocks",
      amount: 12000,
      returnRate: 12.4,
      date: "2026-09-15",
    },
  ],
  goals: [
    {
      id: "goal-1",
      name: "Emergency Fund",
      targetAmount: 50000,
      savedAmount: 17000,
      deadline: "2027-02-15",
    },
    {
      id: "goal-2",
      name: "New Laptop",
      targetAmount: 100000,
      savedAmount: 72000,
      deadline: "2026-12-10",
    },
  ],
  profile: defaultProfile,
};

const safeJsonParse = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("Failed to parse FinanceContext data:", error);
    return null;
  }
};

const getInitialState = () => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const stored = safeJsonParse(localStorage.getItem(STORAGE_KEY));

  if (!stored) {
    return defaultState;
  }

  return {
    income: Number(stored.income) || defaultState.income,
    expenses: Array.isArray(stored.expenses) ? stored.expenses : [],
    budget: Number(stored.budget) || defaultState.budget,
    investments: Array.isArray(stored.investments) ? stored.investments : [],
    goals: Array.isArray(stored.goals) ? stored.goals : [],
    profile: {
      ...defaultProfile,
      ...(stored.profile || {}),
    },
  };
};

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const initialState = useMemo(() => getInitialState(), []);

  const [income, setIncome] = useState(initialState.income);
  const [expenses, setExpenses] = useState(initialState.expenses);
  const [budget, setBudget] = useState(initialState.budget);
  const [investments, setInvestments] = useState(initialState.investments);
  const [goals, setGoals] = useState(initialState.goals);
  const [profile, setProfile] = useState(initialState.profile);

  useEffect(() => {
    const dataToStore = {
      income,
      expenses,
      budget,
      investments,
      goals,
      profile,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    }
  }, [income, expenses, budget, investments, goals, profile]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id:
        expense.id ||
        `expense-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      amount: Number(expense.amount) || 0,
      name: expense.name || "Expense",
      category: expense.category || "Other",
      date: expense.date || new Date().toISOString().slice(0, 10),
    };

    setExpenses((previous) => [newExpense, ...previous]);
  };

  const deleteExpense = (id) => {
    setExpenses((previous) => previous.filter((item) => item.id !== id));
  };

  const setIncomeValue = (value) => {
    setIncome(Number(value) || 0);
  };

  const setBudgetValue = (value) => {
    setBudget(Number(value) || 0);
  };

  const addInvestment = (investment) => {
    const newInvestment = {
      ...investment,
      id:
        investment.id ||
        `investment-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      amount: Number(investment.amount) || 0,
      returnRate: Number(investment.returnRate) || 0,
      date: investment.date || new Date().toISOString().slice(0, 10),
    };

    setInvestments((previous) => [newInvestment, ...previous]);
  };

  const deleteInvestment = (id) => {
    setInvestments((previous) => previous.filter((item) => item.id !== id));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id:
        goal.id ||
        `goal-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      targetAmount: Number(goal.targetAmount) || 0,
      savedAmount: Number(goal.savedAmount) || 0,
      deadline: goal.deadline || new Date().toISOString().slice(0, 10),
    };

    setGoals((previous) => [newGoal, ...previous]);
  };

  const updateGoal = (id, updates) => {
    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== id) return goal;

        const target = Number(updates.targetAmount ?? goal.targetAmount) || 0;
        const saved = Number(updates.savedAmount ?? goal.savedAmount) || 0;

        return {
          ...goal,
          ...updates,
          targetAmount: target,
          savedAmount: Math.min(saved, target),
        };
      })
    );
  };

  const deleteGoal = (id) => {
    setGoals((previous) => previous.filter((goal) => goal.id !== id));
  };

  const updateProfile = (updatedProfile) => {
    setProfile((previous) => ({
      ...previous,
      ...updatedProfile,
    }));
  };

  const resetFinance = () => {
    setIncome(defaultState.income);
    setExpenses(defaultState.expenses);
    setBudget(defaultState.budget);
    setInvestments(defaultState.investments);
    setGoals(defaultState.goals);
    setProfile(defaultState.profile);
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  const currentMonthExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);
      const monthMatches =
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear;

      return monthMatches ? sum + Number(expense.amount || 0) : sum;
    }, 0);
  }, [expenses]);

  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const totalSavings = Math.max(income - totalExpenses, 0);
  const totalInvestment = investments.reduce(
    (sum, investment) => sum + Number(investment.amount || 0),
    0
  );

  const goalProgress =
    goals.length > 0
      ? goals.reduce((sum, goal) => {
          const progress = goal.targetAmount
            ? (Number(goal.savedAmount || 0) / Number(goal.targetAmount || 1)) * 100
            : 0;
          return sum + Math.min(progress, 100);
        }, 0) / goals.length
      : 0;

  const value = {
    income,
    expenses,
    budget,
    investments,
    goals,
    profile,
    totalExpenses,
    currentMonthExpenses,
    remainingBudget,
    totalSavings,
    totalInvestment,
    goalProgress,
    setIncome: setIncomeValue,
    addExpense,
    deleteExpense,
    setBudget: setBudgetValue,
    addInvestment,
    deleteInvestment,
    addGoal,
    updateGoal,
    deleteGoal,
    updateProfile,
    resetFinance,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used inside FinanceProvider");
  }

  return context;
}
