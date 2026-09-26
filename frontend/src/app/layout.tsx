import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BrainCircuit, Sparkles } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INSPIRE | Potential to Placement",
  description: "Intelligent Navigation for Skills, Potential, Industry, Roadmaps & Employment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        
        {/* GLOBAL NAVBAR */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo Segment */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:bg-indigo-700 transition-colors shadow-sm">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">INSPIRE</span>
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">Ecosystem</span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink href="/assessment">Discovery Engine</NavLink>
                <NavLink href="/skills">Gap Analysis</NavLink>
                <NavLink href="/profile">Skill Passport</NavLink>
                <NavLink href="/employer">Industry Access</NavLink>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/#contact" 
                  className="hidden md:block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="/assessment" 
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Link>
              </div>

            </div>
          </div>
        </nav>

        {/* MAIN PAGE CONTENT */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-indigo-500" />
              <span className="font-bold text-lg text-white tracking-tight">INSPIRE</span>
            </div>
            
            <div className="text-sm">
              &copy; {new Date().getFullYear()} INSPIRE Ecosystem. Built for Smart India Hackathon.
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}

// Helper component for cleaner nav links
function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
    </Link>
  );
}