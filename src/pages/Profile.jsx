import { useState } from "react";
import { BriefcaseBusiness, Mail, Phone, Save, User2 } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import "./Profile.css";

const Profile = () => {
  const { profile, updateProfile, resetFinance } = useFinance();

  const [form, setForm] = useState({
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    occupation: profile.occupation || "",
    monthlyIncome: profile.monthlyIncome || 0,
    monthlyBudget: profile.monthlyBudget || 0,
    savingsTarget: profile.savingsTarget || 0,
    preferredCurrency: profile.preferredCurrency || "INR",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateProfile({
      ...form,
      monthlyIncome: Number(form.monthlyIncome) || 0,
      monthlyBudget: Number(form.monthlyBudget) || 0,
      savingsTarget: Number(form.savingsTarget) || 0,
    });
  };

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure you want to reset all financial data?");
    if (!confirmed) return;

    resetFinance();
  };

  return (
    <div className="profile-page">
      <header className="page-header">
        <div className="profile-header-card">
          <div className="avatar-circle">{profile.name ? profile.name.charAt(0).toUpperCase() : "U"}</div>
          <div>
            <p className="page-kicker">FINCOACH AI</p>
            <h1>{profile.name || "Your Profile"}</h1>
            <p className="page-subtitle">Student</p>
          </div>
        </div>
      </header>

      <section className="profile-content">
        <form className="profile-panel" onSubmit={handleSave}>
          <div className="section-heading">
            <h2>Personal Information</h2>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <input type="text" name="occupation" value={form.occupation} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Monthly Income</label>
              <input type="number" name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="settings-box">
            <div className="section-heading">
              <h2>Financial Preferences</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Monthly Budget</label>
                <input type="number" name="monthlyBudget" value={form.monthlyBudget} onChange={handleChange} min="0" />
              </div>

              <div className="form-group">
                <label>Savings Target</label>
                <input type="number" name="savingsTarget" value={form.savingsTarget} onChange={handleChange} min="0" />
              </div>

              <div className="form-group">
                <label>Preferred Currency</label>
                <select name="preferredCurrency" value={form.preferredCurrency} onChange={handleChange}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="secondary-button"><User2 size={15} /> Edit Profile</button>
            <button type="submit" className="primary-button"><Save size={15} /> Save Changes</button>
            <button type="button" className="danger-button" onClick={handleReset}>Reset Financial Data</button>
          </div>
        </form>

        <aside className="profile-sidebar">
          <div className="sidebar-card">
            <div className="mini-icon"><Mail size={18} /></div>
            <div>
              <label>Email</label>
              <strong>{profile.email}</strong>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="mini-icon"><Phone size={18} /></div>
            <div>
              <label>Phone</label>
              <strong>{profile.phone}</strong>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="mini-icon"><BriefcaseBusiness size={18} /></div>
            <div>
              <label>Occupation</label>
              <strong>{profile.occupation}</strong>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Profile;
