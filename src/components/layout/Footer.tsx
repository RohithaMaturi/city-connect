import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const footerLinks = {
  Platform: [
    { href: "/report", label: "Report Issue" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/track", label: "Track Status" },
  ],
  Resources: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "API Docs" },
    { href: "#", label: "City Charter" },
  ],
  Company: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Civic<span className="text-primary">Fix</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered civic reporting platform for smarter cities.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CivicFix. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for smarter cities
          </p>
        </div>
      </div>
    </footer>
  );
}
