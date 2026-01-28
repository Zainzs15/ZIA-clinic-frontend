import { useLocation } from "react-router-dom";
import { useState } from "react";

const PLAN_PRICES = {
  basic: 600,
  premium: 1000,
};

const API_BASE = "http://localhost:5000";

const Payment = () => {
  const location = useLocation();

  const plan = location.state?.plan || "basic";
  const amount = PLAN_PRICES[plan] || PLAN_PRICES.basic;

  const [method, setMethod] = useState("jazzcash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name || !phone) {
      setError("Please enter name and phone.");
      return;
    }

    setLoading(true);
    try {
      // 1) Record payment (demo – simulates transfer to JazzCash number)
      const payRes = await fetch(`${API_BASE}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, plan, name, phone, method }),
      });

      if (!payRes.ok) throw new Error("Payment failed");

      // 2) Create appointment and assign patient number + time slot
      const apptRes = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, plan }),
      });

      if (!apptRes.ok) {
        const j = await apptRes.json().catch(() => null);
        throw new Error(j?.error || "Failed to create appointment");
      }

      const apptJson = await apptRes.json();
      const appt = apptJson.data;

      setMessage(
        `Payment recorded. Patient #${appt.patientNumber}, slot ${new Date(
          appt.slotStart
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(
          appt.slotEnd
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page payment-page">
      <h1>Payment</h1>

      <p>
        You selected the <strong>{plan === "basic" ? "Basic Access" : "Premium Care"}</strong>{" "}
        plan.
      </p>

      <div className="payment-box">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>PKR {amount}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>PKR {amount}</span>
        </div>

        <form onSubmit={handleConfirm} className="payment-form">
          <h3>Patient Details</h3>

          <div className="login-field">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <h3>Payment Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="jazzcash"
              checked={method === "jazzcash"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="jazzcash-logo-badge">
                <span className="jazzcash-logo-text">JazzCash</span>
              </div>
              <span>Pay via JazzCash (to clinic wallet)</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="sadapay"
              checked={method === "sadapay"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-sadapay">SadaPay</div>
              <span>SadaPay – card / wallet transfer</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="nayapay"
              checked={method === "nayapay"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-nayapay">NayaPay</div>
              <span>NayaPay – wallet transfer</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="credit"
              checked={method === "credit"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-card">Credit Card</div>
              <span>Pay with credit card</span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="method"
              value="debit"
              checked={method === "debit"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <div className="payment-option-body">
              <div className="pay-logo pay-logo-card">Debit Card</div>
              <span>Pay with debit card</span>
            </div>
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Processing..." : `Pay PKR ${amount}`}
          </button>
        </form>

        {message && <p className="payment-note" style={{ color: "green" }}>{message}</p>}
        {error && <p className="payment-note" style={{ color: "red" }}>{error}</p>}

        <p className="payment-note">
          Note: This is a demo front-end + backend flow. Actual money transfer and SMS
          sending must be implemented against the real JazzCash / bank APIs.
        </p>
      </div>
    </section>
  );
};

export default Payment;

