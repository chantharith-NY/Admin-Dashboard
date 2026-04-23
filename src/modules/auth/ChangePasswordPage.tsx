import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/layout/AuthLayout";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { changePassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await changePassword(password, confirmPassword);

      navigate("/admin/login", { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <p className="text-4xl font-semibold mb-1 font-moul py-4">
        ប្ដូរពាក្យសម្ងាត់
      </p>
      <p className="text-gray-500 mb-6 font-battambang py-2">
        សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
      >
        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-[#8BAD13]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-[#8BAD13]"
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Password must be at least 8 characters
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#8BAD13] text-white py-2 rounded-lg hover:bg-[#6f8f10] transition"
        >
          {loading ? "Saving..." : "Change Password"}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-6">© Royal Academy of Cambodia</p>
    </AuthLayout>
  );
}
