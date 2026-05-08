import { useState } from "react";
import axios from "axios";

const SellerLogin = ({ setIsSignup }) => {

  const [form, setForm] = useState({
    restaurantName: "",
    ownerEmail: "",
    password: "",
  });

 // REPLACE handleLogin function:
const handleLogin = async (e) => {
  e.preventDefault();

  if (!form.restaurantName || !form.ownerEmail || !form.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post(
  "http://localhost:5000/api/seller/login",
  {
    ownerEmail: form.ownerEmail,
    password: form.password
  },
  {
    withCredentials: true
  }
);
    if (response.data.success) {
  alert("Login Successful ");
  window.location.reload();
}
  } catch (error) {
    alert(error.response?.data?.msg || "Login Failed ");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Seller Login
        </h2>

        <input
          type="text"
          placeholder="Restaurant Name"
          className="w-full mb-4 p-2 border rounded-lg"
          value={form.restaurantName}
          onChange={(e) =>
            setForm({ ...form, restaurantName: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Owner Email"
          className="w-full mb-4 p-2 border rounded-lg"
          value={form.ownerEmail}
          onChange={(e) =>
            setForm({ ...form, ownerEmail: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded-lg"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800">
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => setIsSignup(true)}
            className="text-blue-900 cursor-pointer font-semibold"
          >
            Create Account
          </span>
        </p>

      </form>
    </div>
  );
};

export default SellerLogin;








