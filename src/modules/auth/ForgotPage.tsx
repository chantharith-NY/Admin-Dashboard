import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import api from "../../services/api";

export default function ForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post("/forgot-password", { email });

    navigate("/admin/verify-otp", {
      state: { email },
    });
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-moul mb-6">ភ្លេចពាក្យសម្ងាត់</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="អ៊ីមែល"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-[#8BAD13] text-white py-2 rounded">
          ផ្ញើ OTP
        </button>
      </form>
    </AuthLayout>
  );
}
