"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { BrainCircuit, Sparkles, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Exact checks for different page types
  const isLandingPage = pathname === "/";
  const isAuthPage = pathname?.startsWith("/auth");
  const isDashboard = !isLandingPage && !isAuthPage;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#fafafa] text-slate-900 antialiased flex flex-col min-h-screen relative overflow-x-hidden`}>
        
        {/* PREMIUM GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-50 h-full w-full bg-[#fafafa] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-[0.15] blur-[100px]"></div>
        </div>
        
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-xl border-b border-white/80 z-50 transition-all shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">INSPIRE</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-600 uppercase mt-0.5">Ecosystem</span>
                </div>
              </Link>

              {/* Show Original Options ONLY on Landing Page */}
              {isLandingPage && (
                <div className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-slate-200/60 shadow-sm backdrop-blur-md">
                  <NavLink href="/#features">Features</NavLink>
                  <NavLink href="/#how-it-works">How It Works</NavLink>
                  <NavLink href="/#stakeholders">Stakeholders</NavLink>
                  <NavLink href="/#skill-passport">Skill Passport</NavLink>
                  <NavLink href="/#contact">Contact Us</NavLink>
                </div>
              )}

              {/* Action Buttons Based on Page */}
              <div className="flex items-center gap-3">
                {isLandingPage && (
                  <>
                    <Link href="/auth/login" className="hidden md:block px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all">
                      Log In
                    </Link>
                    <Link href="/auth/register" className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </Link>
                  </>
                )}
                
                {isAuthPage && (
                  <Link href="/" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 bg-white/50 border border-slate-200/60 rounded-full transition-all shadow-sm hover:shadow-md backdrop-blur-md">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                )}

                {isDashboard && (
                  <>
                    <Link href="/student" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors mr-4">
                      Dashboard
                    </Link>
                    <Link href="/" className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
                      Log Out
                    </Link>
                  </>
                )}
              </div>

            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-grow pt-20">
          {children}
        </main>

      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 px-4 py-2 rounded-full transition-all">
      {children}
    </Link>
  );
}