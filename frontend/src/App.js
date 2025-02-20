import { useState } from "react";
import emailjs from "emailjs-com";

const App = () => {
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

    // Generate UPI link
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Payment`;

    // Send email with the active hyperlink
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
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg border mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Enter UPI ID (e.g., example@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
