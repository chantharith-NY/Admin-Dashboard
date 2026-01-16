import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    // TODO: call Laravel admin login API
    localStorage.setItem("admin_token", "mock-token")
    navigate("/admin", { replace: true })
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT — LOGIN FORM */}
      <div className="flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          
          <p className="text-4xl font-semibold mb-1 font-moul py-4">
            ចូលគ្រប់គ្រងប្រព័ន្ធ
          </p>
          <p className="text-gray-500 mb-6 font-battambang py-2">
            សូមបញ្ចូលព័ត៌មានគណនីរបស់អ្នក
          </p>

          <div className="space-y-4">
            <input
              className="
                w-full border rounded-lg px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-[#8BAD13]
              "
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="
                w-full border rounded-lg px-4 py-2 pr-12
                focus:outline-none focus:ring-2 focus:ring-[#8BAD13]
                "
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <a
                type="button"
                onClick={() => setShowPassword(v => !v)}
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

            <button
              onClick={handleLogin}
              className="
                w-full bg-[#8BAD13] text-white py-2 rounded-lg
                hover:bg-[#6f8f10] transition font-medium font-battambang
              "
            >
              ចូលប្រើប្រាស់
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            © Royal Academy of Cambodia
          </p>
        </div>
      </div>

      {/* RIGHT — BRANDING */}
      <div className="
        hidden md:flex
        items-center justify-center
        bg-linear-to-br from-[#8BAD13] to-[#5e7c0d]
        text-white px-10
      ">
        <div className="text-center max-w-sm">
          <img
            src="/rac-logo.png"
            alt="RAC Logo"
            className="w-40 mx-auto py-4"
          />

          <p className="text-3xl font-moul py-2">
            រាជបណ្ឌិត្យសភាកម្ពុជា
          </p>

          <p className="text-base font-battambang leading-relaxed text-white/90">
            ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសម្រាប់
            ការត្រួតពិនិត្យប្រវត្តិ
            សង្ខេបអត្ថបទ និងកែអក្ខរាវិរុទ្ធ
            ដោយប្រើបញ្ញាសិប្បនិម្មិត
          </p>
        </div>
      </div>

    </div>
  )
}
