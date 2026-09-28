# INSPIRE — Intelligent Navigation for Skills, Potential, Industry, Roadmaps & Employment

INSPIRE is a skill-first Academia–Industry collaboration platform built for the **Smart India Hackathon (MVP)**. It demonstrates a connected, explainable journey from student potential discovery to verified skills and opportunity matching—bridging the gap between **what students learn**, **what skills they build**, and **what industry needs**.

## Problem Statement
Students often complete academic courses without:
- clear awareness of their strengths/interests,
- understanding suitable career domains,
- knowing industry-required skills and their own skill gaps,
- a structured, verifiable portfolio.

Industry struggles to find candidates with the right combination of skills and evidence, while institutions have limited visibility into evolving skill demand and student gaps.

## INSPIRE Solution (Core Idea)
INSPIRE connects **Students, Faculty, Employers, and Institutions** through a shared intelligence layer and a unified workflow:

**Potential Discovery → Career Exploration → Skill Identification → Skill Gap Analysis → Learning → Project → Internship → Placement**

Key principles:
- **Skill-first** (not just job-first)
- **Explainable** recommendations (shows “why”)
- **Verified evidence** through a faculty verification workflow
- **Actionable pathways** (roadmap, projects, opportunities)

---

## MVP Highlights (What You Can Demo)
This MVP focuses on a judge-friendly, end-to-end flow with connected stakeholder dashboards.

### 1) Student (Indigo)
- Explainable **career domain exploration**
- “AI Roadmap” generation (structured roadmap output)
- **Skill Passport**: add skills/projects/certificates as evidence
- Status workflow: `Self/ Pending → Verified / Rejected`
- Explainable **opportunity matching** (matched vs missing skills)

### 2) Faculty (Violet)
- **Verification Queue**: review pending passport items
- Verify/Reject with a simple rubric (checkbox-based for realism)
- Curriculum alignment snapshot based on posted opportunities (MVP intelligence)

### 3) Employer (Emerald)
- Post an opportunity (job/internship)
- **Skill extraction** from JD (taxonomy-based NLP-lite)
- **Talent discovery** ranking with explainable match score
- Shortlist (demo-only)

### 4) Institution (Blue)
- Campus intelligence overview (students, verified evidence, pending items, opportunities)
- Placement analytics charts (MVP)
- Demand trends derived from employer posts

---

## Important MVP Note: Demo Store (No DB Dependency)
For hackathon speed and stable demos, the platform uses a **local Demo Store (localStorage)** to keep the ecosystem connected:
- Student adds evidence → appears in Faculty queue
- Faculty verifies → updates Student passport
- Employer matching + Institution analytics reflect the same data

Supabase integration exists in the repository for future scaling, but the judging flow runs without requiring live DB setup.

---

## Tech Stack
**Frontend**
- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS
- Framer Motion (sidebar + modal transitions)
- Lucide React (icons)

**Backend / DB (future-ready)**
- Supabase (PostgreSQL + Auth + RLS) — planned for full version
- FastAPI (Python) — planned for AI/ML integration

---

## UI/UX Design System
- Official educational/gov portal style (clean, structured, minimal)
- Unified dashboard layout:
  - `h-screen`, `overflow-hidden` outer shell
  - Desktop sidebar + mobile slide-in sidebar
  - Main content area: `flex-1 overflow-y-auto`
- Accent colors:
  - Student: Indigo
  - Employer: Emerald
  - Faculty: Violet
  - Institution: Blue

---

## Quick Start (Local)
> Project structure: `/frontend` (Next.js), `/backend` (future), `/ml/Model1` (research/notes)

```bash
cd frontend
npm install
npm run dev
