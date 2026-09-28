"use client";

import React from "react";
import { DemoActions, DemoState, EvidenceStatus } from "./types";
import { DEMO_STORAGE_KEY, seedState } from "./seed";

type DemoContextValue = DemoState & DemoActions;

const DemoContext = React.createContext<DemoContextValue | null>(null);

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function load(): DemoState {
  if (typeof window === "undefined") return seedState();
  const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!raw) return seedState();
  try {
    return JSON.parse(raw) as DemoState;
  } catch {
    return seedState();
  }
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<DemoState>(() => load());

  React.useEffect(() => {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const actions: DemoActions = {
    setCurrentStudent(id) {
      setState((s) => ({ ...s, currentStudentId: id }));
    },

    saveAssessment(a) {
      setState((s) => ({
        ...s,
        assessments: { ...s.assessments, [a.studentId]: a },
      }));
    },

    addPassportItem(item) {
      setState((s) => ({
        ...s,
        passport: [
          {
            ...item,
            id: uid("pass"),
            createdAt: new Date().toISOString(),
          },
          ...s.passport,
        ],
      }));
    },

    updatePassportStatus(id, status: EvidenceStatus, opts) {
      setState((s) => ({
        ...s,
        passport: s.passport.map((p) => {
          if (p.id !== id) return p;
          const base = { ...p, status };
          if (status === "verified") {
            return {
              ...base,
              verifiedAt: new Date().toISOString(),
              verifiedBy: opts?.verifiedBy ?? "Faculty Reviewer",
              note: undefined,
            };
          }
          if (status === "rejected") {
            return {
              ...base,
              verifiedAt: new Date().toISOString(),
              verifiedBy: opts?.verifiedBy ?? "Faculty Reviewer",
              note: opts?.note ?? "Insufficient evidence",
            };
          }
          return base;
        }),
      }));
    },

    addOpportunity(op) {
      setState((s) => {
        const id = uid("opp");
        return {
          ...s,
          opportunities: [{ ...op, id, createdAt: new Date().toISOString() }, ...s.opportunities],
          selectedOpportunityId: id,
        };
      });
    },

    setSelectedOpportunity(id) {
      setState((s) => ({ ...s, selectedOpportunityId: id }));
    },

    resetDemo() {
      setState(seedState());
    },
  };

  const value: DemoContextValue = { ...state, ...actions };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = React.useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider />");
  return ctx;
}