import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* ================= MOBILE DIAGONAL BRANDING ================= */}
      <div className="relative md:hidden">
        {/* Green diagonal background */}
        <div
          className="bg-[#8BAD13] text-white pt-12 pb-32 px-6"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 65%, 55% 100%, 0 70%)",
          }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Logo */}
            <img src="/rac-logo.png" alt="RAC Logo" className="w-24" />

            {/* Title */}
            <p className="font-moul text-xl leading-tight">
              រាជបណ្ឌិត្យសភាកម្ពុជា
            </p>

            {/* Description */}
            <p className="font-battambang text-sm text-white/90 leading-relaxed max-w-xs">
              ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ សម្រាប់ការត្រួតពិនិត្យប្រវត្តិ
              សង្ខេបអត្ថបទ និងកែអក្ខរាវិរុទ្ធ ដោយប្រើបញ្ញាសិប្បនិម្មិត
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white px-6">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="hidden md:grid grid-cols-2 min-h-screen">
        {/* LEFT — LOGIN FORM */}
        <div className="flex items-center justify-center bg-white px-6">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* RIGHT — BRANDING */}
        <div
          className="
        hidden md:flex
        items-center justify-center
        bg-linear-to-br from-[#8BAD13] to-[#5e7c0d]
        text-white px-10
      "
        >
          <div className="text-center max-w-sm">
            <img
              src="/rac-logo.png"
              alt="RAC Logo"
              className="w-40 mx-auto py-4"
            />

            <p className="text-3xl font-moul py-2">រាជបណ្ឌិត្យសភាកម្ពុជា</p>

            <p className="text-base font-battambang leading-relaxed text-white/90">
              ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសម្រាប់ ការត្រួតពិនិត្យប្រវត្តិ
              សង្ខេបអត្ថបទ និងកែអក្ខរាវិរុទ្ធ ដោយប្រើបញ្ញាសិប្បនិម្មិត
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
