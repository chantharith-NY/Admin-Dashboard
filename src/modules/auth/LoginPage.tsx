import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import AuthLayout from "../../components/layout/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await login(email, password);
      const data = res?.data || res;

      console.log("LOGIN RESPONSE:", data);

      if (data.otp_required) {
        navigate("/admin/verify-otp", {
          state: { user_id: data.user_id },
        });
        return;
      }

      if (data.must_change_password) {
        navigate("/admin/change-password", { replace: true });
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <AuthLayout>
      <p className="text-4xl font-semibold mb-1 font-moul py-4">
        ចូលគ្រប់គ្រងប្រព័ន្ធ
      </p>
      <p className="text-gray-500 mb-6 font-battambang py-2">
        សូមបញ្ចូលព័ត៌មានគណនីរបស់អ្នក
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          className="
                w-full border rounded-lg px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-[#8BAD13]
              "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative space-y-2">
          <input
            type={showPassword ? "text" : "password"}
            className="
                w-full border rounded-lg px-4 py-2 pr-12
                focus:outline-none focus:ring-2 focus:ring-[#8BAD13]
                "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <a
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="
                absolute inset-y-0 right-3
                flex items-center
                text-gray-500 hover:text-gray-700
                "
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </a>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-[#8BAD13] font-battambang"
            onClick={() => navigate("/admin/forgot-password")}
          >
            ភ្លេចពាក្យសម្ងាត់?
          </button>
        </div>

        <button
          type="submit"
          className="
                w-full bg-[#8BAD13] text-white py-2 rounded-lg
                hover:bg-[#6f8f10] transition font-medium font-battambang
              "
        >
          {loading ? "Loading..." : "ចូលប្រើប្រាស់"}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-6">© Royal Academy of Cambodia</p>
    </AuthLayout>
  );
}
