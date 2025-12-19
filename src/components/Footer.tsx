import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/fav2-removebg-preview.png" alt="OptaNex Logo" className="w-10 h-8 rounded-lg" />
            <h3 className="text-xl font-bold text-foreground">
              OptaNex
            </h3>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Complete eye care companion built for people with visual impairments.
            Designed with accessibility, medical accuracy, and trust at its core.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">
            Product
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="hover:text-gradient-head transition">Optiscreen</li>
            <li className="hover:text-gradient-head transition">Optitrack</li>
            <li className="hover:text-gradient-head transition">Prescription Tracker</li>
            <li className="hover:text-gradient-head transition">GlareGuard</li>
            <li className="hover:text-gradient-head transition">Eye Chronicle</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">
            Company
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="hover:text-gradient-head transition">About OptaNex</li>
            <li className="hover:text-gradient-head transition">Accessibility</li>
            <li className="hover:text-gradient-head transition">Privacy & Data</li>
            <li className="hover:text-gradient-head transition">Contact</li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">
            Connect
          </h4>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a aria-label="Twitter" className="hover:text-foreground transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a aria-label="GitHub" className="hover:text-foreground transition">
              <Github className="h-5 w-5" />
            </a>
            <a aria-label="LinkedIn" className="hover:text-foreground transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a aria-label="Email" className="hover:text-foreground transition">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} OptaNex. All rights reserved.
      </div>
    </footer>
  );
}
