"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (pathname && pathname.startsWith("/admin")) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col gap-3 items-end select-none pointer-events-none">
      
      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919500012200"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center cursor-pointer pointer-events-auto"
        aria-label="WhatsApp"
      >
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.38)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] border border-white/25">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.451 5.485 0 9.94-4.447 9.943-9.933.001-2.657-1.03-5.155-2.905-7.03C16.586 1.758 14.097.715 11.442.715c-5.49 0-9.946 4.45-9.949 9.937-.001 1.914.5 3.775 1.453 5.4l-.953 3.484 3.567-.936zm11.306-6.866c-.305-.153-1.805-.89-2.083-.992-.278-.102-.48-.153-.68.153-.2.305-.776.992-.953 1.193-.176.2-.353.224-.658.072-1.462-.73-2.533-1.284-3.535-3.007-.263-.45.263-.418.752-1.393.082-.167.04-.31-.02-.463-.06-.152-.48-1.15-.658-1.577-.173-.416-.347-.359-.48-.359-.124-.002-.266-.002-.408-.002-.143 0-.376.054-.572.27-.197.216-.752.735-.752 1.79 0 1.057.77 2.08.878 2.224.108.143 1.516 2.315 3.67 3.248 1.079.467 1.92.747 2.576.955.512.162.977.139 1.344.084.41-.06 1.805-.738 2.06-1.452.253-.715.253-1.328.176-1.452-.078-.124-.278-.2-.58-.352z" />
          </svg>
        </div>
      </a>

      {/* Call Floating Icon */}
      <a
        href="tel:+919500012200"
        className="flex items-center justify-center cursor-pointer pointer-events-auto"
        aria-label="Call"
      >
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#E5B22D] to-[#F3C33D] text-white shadow-[0_8px_25px_rgba(243,195,61,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_12px_32px_rgba(243,195,61,0.6)] border border-white/25">
          <Phone className="w-5.5 h-5.5 text-white" />
        </div>
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-10 h-10 rounded-full bg-neutral-900 text-white shadow-[0_6px_25px_rgba(0,0,0,0.25)] border border-white/10 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 hover:bg-neutral-800 cursor-pointer ${
          showScrollTop 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-75 pointer-events-none translate-y-3"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4.5 h-4.5 text-white" />
      </button>

    </div>
  );
}

