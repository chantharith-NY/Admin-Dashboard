import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../hooks/useAuth";

export default function OtpPage() {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.user_id;

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }

    try {
      await verifyOtp(userId, code);
      navigate("/admin", { replace: true });
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "OTP verification failed. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <AuthLayout>
      <p className="text-4xl font-semibold mb-1 font-moul py-4">
        ចូលគ្រប់គ្រងប្រព័ន្ធ
      </p>
      <p className="text-gray-500 mb-6 font-battambang py-2">
        សូមបញ្ចូលលេខកូដ OTP របស់លោកអ្នក
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <div className="flex gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              maxLength={1}
              value={d}
              inputMode="numeric"
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");

                if (!val) {
                  const newOtp = [...otp];
                  newOtp[i] = "";
                  setOtp(newOtp);
                  return;
                }

                const newOtp = [...otp];

                // 🔥 handle multi-digit input (mobile)
                for (let j = 0; j < val.length && i + j < 6; j++) {
                  newOtp[i + j] = val[j];
                }

                setOtp(newOtp);

                // 🔥 move focus correctly
                const nextIndex = Math.min(i + val.length, 5);
                inputsRef.current[nextIndex]?.focus();
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const newOtp = [...otp];

                  if (otp[i]) {
                    newOtp[i] = "";
                    setOtp(newOtp);
                  } else if (i > 0) {
                    inputsRef.current[i - 1]?.focus();
                  }
                }
              }}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text").slice(0, 6);
                if (!/^\d+$/.test(paste)) return;

                const newOtp = paste.split("");
                while (newOtp.length < 6) newOtp.push("");

                setOtp(newOtp);
              }}
              onFocus={(e) => e.target.select()} // 🔥 important UX
              className="w-full h-12 border text-center text-lg rounded focus:outline-none focus:ring-2 focus:ring-[#8BAD13]"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">
          កូដផុតកំណត់ក្នុង {formatTime()}
        </p>

        <button
          type="submit"
          className="w-full bg-[#8BAD13] text-white py-2 rounded"
        >
          ផ្ទៀងផ្ទាត់
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-6">© Royal Academy of Cambodia</p>
    </AuthLayout>
  );
}
