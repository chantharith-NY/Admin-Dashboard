import { Link } from "react-router-dom"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-30 bg-[#8BAD13] text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Top: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Column 1: About */}
          <div>
            <h4 className="font-moul text-xl mb-4">
              រាជបណ្ឌិត្យសភាកម្ពុជា
            </h4>
            <p className="text-base leading-6 text-white/90 font-battambang">
              វេទិកាបញ្ញាសិប្បនិម្មិតសម្រាប់គាំទ្រការសិក្សា
              និងការស្រាវជ្រាវ ដោយប្រើបច្ចេកវិទ្យាទំនើប។
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-moul">
              តំណភ្ជាប់រហ័ស
            </h4>
            <ul className="space-y-2 text-base font-battambang">
              <li>
                <Link to="/" className="hover:underline">
                  ទំព័រដើម
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  អំពីពួកយើង
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  ទំនាក់ទំនង
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4​ font-moul">
              ទំនាក់ទំនង
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <a 
                  href="mailto:"
                  className="flex justify-around items-center space-x-1.5"
                >
                  <Mail size={16} />
                  <span>info@rac.gov.kh</span>
                </a>
                
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href="tel:+855xxxxxxxx"
                  className="flex justify-around items-center space-x-1.5"
                >
                  <Phone size={16} />
                  <span>+855 xx xxx xxx</span>
                </a>
              </div>

              <div className="flex gap-4 mt-4">
                <a 
                  href="/"
                  className="hover:text-white/80 cursor-pointer text-xl">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="/" 
                  className="hover:text-white/80 cursor-pointer text-xl"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 mt-10 pt-6 text-center ">
          <p className="text-sm text-white/90"><span className="font-inter">© 2025</span> <span className="font-moul">រាជបណ្ឌិត្យសភាកម្ពុជា សិទ្ធិគ្រប់យ៉ាងបានរក្សាទុក។</span></p>
        </div>
      </div>
    </footer>
  )
}
