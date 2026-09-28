"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  widthClass = "max-w-2xl",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClass?: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 bg-black/30 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed z-[60] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] ${widthClass}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "tween", duration: 0.18 }}
          >
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="h-14 px-5 flex items-center justify-between border-b border-slate-200">
                <div className="font-extrabold text-slate-900">{title}</div>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">{children}</div>
              {footer ? <div className="p-5 border-t border-slate-200 bg-slate-50">{footer}</div> : null}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}