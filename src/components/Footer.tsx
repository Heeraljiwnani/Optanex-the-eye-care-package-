import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/optanex-logo.png" alt="OptaNex Logo" className="w-10 h-8 rounded-lg" />
            <h3 className="text-xl font-bold text-foreground">
              OptaNex
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
            Complete eye care companion built for people with visual impairments.
            Designed with accessibility, medical accuracy, and trust at its core.
          </p>
        </div>

        {/* Product */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">
            Product
          </h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
            <li className="hover:text-gradient-head transition cursor-pointer">Optiscreen</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Optitrack</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Prescription Tracker</li>
            <li className="hover:text-gradient-head transition cursor-pointer">GlareGuard</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Eye Chronicle</li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">
            Company
          </h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
            <li className="hover:text-gradient-head transition cursor-pointer">About OptaNex</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Accessibility</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Privacy & Data</li>
            <li className="hover:text-gradient-head transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Connect */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">
            Connect
          </h4>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a aria-label="Twitter" className="hover:text-foreground transition cursor-pointer">
              <Twitter className="h-5 w-5" />
            </a>
            <a aria-label="GitHub" className="hover:text-foreground transition cursor-pointer">
              <Github className="h-5 w-5" />
            </a>
            <a aria-label="LinkedIn" className="hover:text-foreground transition cursor-pointer">
              <Linkedin className="h-5 w-5" />
            </a>
            <a aria-label="Email" className="hover:text-foreground transition cursor-pointer">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4 sm:py-5 text-center text-[10px] sm:text-sm text-muted-foreground px-4">
        © {new Date().getFullYear()} OptaNex. All rights reserved.
      </div>
    </footer>
  );
}
