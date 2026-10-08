import {
  Utensils,
  Pill,
  Bus,
  BookOpen,
  ShieldAlert,
  ShoppingBag,
  Receipt,
  Trash2,
} from "lucide-react";
import "./ListItem.css";

const categoryConfig = {
  food: {
    label: "Food",
    icon: Utensils,
  },
  medicines: {
    label: "Medicines",
    icon: Pill,
  },
  travel: {
    label: "Travel",
    icon: Bus,
  },
  study: {
    label: "Study",
    icon: BookOpen,
  },
  emergency: {
    label: "Emergency",
    icon: ShieldAlert,
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingBag,
  },
};

const ListItem = ({ item, onDelete }) => {
  const category =
    categoryConfig[item?.category] || {
      label: "Other",
      icon: Receipt,
    };

  const CategoryIcon = category.icon;

  // Safely get expense amount
  const getAmount = () => {
    const amount = Number(item?.amount ?? item?.price ?? 0);

    return Number.isNaN(amount) ? 0 : amount;
  };

  // Format amount in Indian Rupees
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Delete expense
  const handleDelete = () => {
    if (!onDelete || !item?.id) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name || "this expense"}"?`
    );

    if (confirmed) {
      onDelete(item.id);
    }
  };

  return (
    <div className="list-item">
      {/* Left Section */}
      <div className="list-item-left">
        <div className="list-item-category-icon">
          <CategoryIcon size={18} />
        </div>

        <div className="list-item-details">
          <h3>{item?.name || "Unnamed Expense"}</h3>

          <div className="list-item-meta">
            <span>{category.label}</span>

            {item?.date && (
              <>
                <span className="meta-dot">•</span>
                <span>{formatDate(item.date)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="list-item-right">
        <span className="list-item-amount">
          - ₹{formatAmount(getAmount())}
        </span>

        <button
          type="button"
          className="list-item-delete"
          onClick={handleDelete}
          title="Delete expense"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

export default ListItem;