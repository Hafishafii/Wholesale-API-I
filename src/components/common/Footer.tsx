import { Link } from "react-router-dom"
const Footer = () => (
  <footer className="bg-[#00113A] text-gray-200 py-6 px-2">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      {/* Quick Links */}
      <div>
        <h3 className="font-extrabold text-xl mb-4">Quick Links</h3>
        <ul className="space-y-3 text-lg font-semibold text-white">
          <li>
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-400 transition">Products</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-400 transition">Profile</Link>
          </li>
          <li>
            <Link to="/notifications" className="hover:text-gray-400 transition">Notification</Link>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-4 justify-center text-base font-medium">
        <div className="flex items-center gap-3">
          {/* Email icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M22 5 12 13 2 5" />
          </svg>
          <span>www.crafthub.com</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Phone icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
          </svg>
          <span>+91 9876543210</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Location icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span>ABC Street, xyz District<br />678971</span>
        </div>
      </div>
    </div>

    {/* FAQ and Socials */}
    <div className="mt-10 flex flex-col items-center gap-4">
      <span className="font-extrabold text-xl">FAQ</span>

      <div className="flex gap-6">
        {/* Facebook */}
        <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.88v-7h-2.54v-2.88h2.54V9.75c0-2.51 1.5-3.88 3.8-3.88 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.26 0-1.65.78-1.65 1.57v1.89h2.81l-.45 2.88h-2.36v7C18.34 21.2 22 17.07 22 12.07z" />
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.34 8.54 8.54 0 01-2.7 1.03 4.25 4.25 0 00-7.24 3.87A12.06 12.06 0 013 4.79a4.25 4.25 0 001.31 5.67A4.2 4.2 0 012.8 9.8v.05a4.25 4.25 0 003.4 4.17 4.3 4.3 0 01-1.92.07 4.26 4.26 0 003.97 2.96A8.52 8.52 0 012 19.54 12.06 12.06 0 008.29 21c7.55 0 11.68-6.25 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
