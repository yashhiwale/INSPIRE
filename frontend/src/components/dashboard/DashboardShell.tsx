"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, RotateCcw } from "lucide-react";
import { useDemo } from "@/lib/demo/store";

type Accent = "indigo" | "emerald" | "violet" | "blue";

const accentMap: Record<
  Accent,
  { ring: string; active: string; activeText: string }
> = {
  indigo: {
    ring: "focus-visible:ring-indigo-600/30",
    active: "bg-indigo-50",
    activeText: "text-indigo-700",
  },
  emerald: {
    ring: "focus-visible:ring-emerald-600/30",
    active: "bg-emerald-50",
    activeText: "text-emerald-700",
  },
  violet: {
    ring: "focus-visible:ring-violet-600/30",
    active: "bg-violet-50",
    activeText: "text-violet-700",
  },
  blue: {
    ring: "focus-visible:ring-blue-600/30",
    active: "bg-blue-50",
    activeText: "text-blue-700",
  },
};

export type ShellTab = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function DashboardShell({
  accent = "blue",
  brandSubtitle,
  tabs,
  activeTab,
  onTabChange,
  children,
  headerTitle = "Dashboard",
}: {
  accent?: Accent;
  brandSubtitle?: string;
  tabs: ShellTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  children: React.ReactNode;
  headerTitle?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const a = accentMap[accent];
  const { resetDemo } = useDemo();

  const TabBtn = ({ t }: { t: ShellTab }) => {
    const Icon = t.icon;
    const active = activeTab === t.key;

    return (
      <button
        onClick={() => {
          onTabChange(t.key);
          setOpen(false);
        }}
        className={[
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold border transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          a.ring,
          active
            ? `${a.active} ${a.activeText} border-slate-200`
            : "border-transparent text-slate-700 hover:bg-slate-100",
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
        {t.label}
      </button>
    );
  };

  const Sidebar = (
    <div className="h-full flex flex-col">
      {/* BRAND (Wordmark only) */}
      <div className="px-5 h-16 flex items-center gap-3 border-b border-slate-200">
        <div className="flex flex-col leading-tight">
          <div className="h-7 w-[160px] relative">
            <Image
              src="/SkillBridge-wordmark.png"
              alt="SkillBridge"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          {brandSubtitle ? (
            <div className="text-xs text-slate-500 mt-0.5">{brandSubtitle}</div>
          ) : null}
        </div>
      </div>

      <div className="p-3">
        <div className="px-3 pt-2 pb-1 text-[11px] font-extrabold text-slate-400 tracking-wider">
          MAIN MENU
        </div>
        <div className="mt-2 space-y-1">
          {tabs.map((t) => (
            <TabBtn key={t.key} t={t} />
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 text-xs text-slate-400 border-t border-slate-200 space-y-3">
        <div>Official Academic-Industry Portal UI (MVP Demo)</div>

        <button
          onClick={() => {
            const ok = confirm("Reset demo data to default seed?");
            if (ok) resetDemo();
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-extrabold hover:bg-rose-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Demo Data
        </button>

        <a
          href="/demo"
          className="block text-center w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800"
        >
          Open Demo Launchpad
        </a>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-50 font-sans flex text-slate-900 overflow-hidden relative">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200">
        {Sidebar}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close overlay"
              className="lg:hidden absolute inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="lg:hidden absolute left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 shadow-2xl"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <div className="relative h-full">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                  className="absolute right-3 top-3 h-10 w-10 rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
                {Sidebar}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <button
            onClick={() => setOpen(true)}
            className="h-10 w-10 rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-sm font-extrabold">{headerTitle}</div>

          {/* Wordmark tiny in header right */}
          <div className="h-7 w-[110px] relative">
            <Image
              src="/SkillBridge-wordmark.png"
              alt="SkillBridge"
              fill
              className="object-contain object-right"
            />
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}