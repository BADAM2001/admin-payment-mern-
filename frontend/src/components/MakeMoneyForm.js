import { useState } from "react";
import emailjs from "emailjs-com";
import "../App.css"; // Import the CSS

const MakeMoneyForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !upiId || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    // Generate UPI payment link
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Payment`;

    // Send email with UPI link
    emailjs
      .send(
        "service_6y1pzwd", // Replace with your Email.js Service ID
        "template_yt5no9t", // Replace with your Email.js Template ID
        { message: upiLink }, // Pass the UPI link to the template
        "ilQBkd_R4XgKhb-mF" // Replace with your Email.js Public Key
      )
      .then((response) => {
        console.log("Email sent successfully", response);
        alert("Payment request sent to admin!");
      })
      .catch((error) => {
        console.error("Error sending email", error);
        alert("Failed to send email");
      });
  };

  return (
    <div className="make-money-container">
      <div className="make-money-form">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Make Money Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded bg-white bg-opacity-50 text-gray-900"
            required
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded bg-white bg-opacity-50 text-gray-900"
            required
          />
          <input
            type="text"
            placeholder="Enter UPI ID (e.g., example@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full p-3 border rounded bg-white bg-opacity-50 text-gray-900"
            required
          />
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded bg-white bg-opacity-50 text-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeMoneyForm;
