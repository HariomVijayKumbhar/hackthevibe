import { Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">SafeCampus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Creating safer campus environments through technology and awareness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/complaints/new" className="hover:text-foreground transition-colors">Report Incident</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/dashboard/cyber-awareness" className="hover:text-foreground transition-colors">Cyber Awareness</Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Emergency</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Anti-Ragging Helpline: 1800-180-5522</li>
              <li>Women Helpline: 181</li>
              <li>Police Emergency: 100</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SafeCampus. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-destructive" /> for student safety
          </p>
        </div>
      </div>
    </footer>
  );
}