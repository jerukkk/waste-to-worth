# Handover Document: Waste to Worth (W2W) Platform

This document serves as a technical handover for the **Waste to Worth** project—a circular e-waste management platform designed for Makassar, Indonesia.

---

## 1. Technical Stack & Architecture

*   **Framework**: Next.js 14+ (App Router)
*   **Language**: TypeScript
*   **Database**: PostgreSQL via Prisma ORM
*   **Styling**: Tailwind CSS with a custom design system (defined in `tailwind.config.ts`)
*   **Icons**: Lucide React
*   **Authentication**: JWT-based (using `jose` for Edge compatibility) with HTTP-only cookies.

---

## 2. Key Features Implemented

### 🔐 Authentication & Role Management
*   **Custom Login**: Located at `/login`. Features a role-selector (Citizen vs. Admin).
*   **Role Verification**: The login API (`/api/auth/login`) verifies that the selected role matches the user's role in the database to prevent unauthorized access attempts.
*   **Protected Routes**: `middleware.ts` handles redirection and role-based route protection.

### 📊 Citizen Dashboard (`/dashboard`)
*   **Real-time Stats**: Fetched via `/api/dashboard`. Displays:
    *   **Total Points**: Synchronized with `User.pointsBalance`.
    *   **Personal Impact**: Aggregated weight from verified submissions.
    *   **Active Submissions**: Real-time count of pending items.
*   **Visualizations**: Community Impact panel showing platform-wide collection totals and district-wise activity bars.
*   **Dynamic Sidebar**: Responsive navigation with first-name greeting fetched from DB.

### ♻️ Submission System (`/submit`)
*   **Method Chooser**: Landing page to select between "Smart Dropbox" and "On-Demand Pickup".
*   **Smart Hub Capacity**: Real-time capacity monitoring of physical dropbox locations.
*   **Dropbox Flow**:
    *   **Stage 1 (Form)**: Selection of box and item declaration.
    *   **Stage 2 (Verifying)**: Simulated/Real verification state (orchestrator in `dropbox/page.tsx`).
    *   **Stage 3 (Completed)**: Final confirmation and points award visualization.
    *   **Submit Again**: Setelah verifikasi selesai (Stage 3), tampilkan tombol "Submit Another Item" yang memungkinkan pengguna kembali ke Stage 1 untuk submit barang lagi. Tombol ini **hanya aktif jika masih ada slot Box yang tersedia** di dropbox yang dipilih. Cek ketersediaan via `Box.isAvailable` dan `DropboxLocation.currentBoxCount < maxCapacity`. Jika dropbox sudah penuh, tampilkan pesan bahwa dropbox sudah penuh dan arahkan ke pemilihan dropbox lain atau metode Pickup.

---

## 3. Database Schema Overview

The system uses a highly structured schema to handle the complexity of e-waste logistics:

*   **User**: Stores points, roles, and basic info.
*   **DropboxLocation & Box**: Manages physical infrastructure and capacity.
*   **District**: Geographies served by the platform.
*   **Batch**: Grouping mechanism for logistics (Submissions -> Batches -> Pickup Schedules).
*   **Submission & SubmissionItem**: The core transaction records.
*   **PointRule**: Configuration for how many points are awarded per kg per item type.

---

## 4. Development Guidelines & "Gotchas"

### 💡 Real Data vs. Placeholders
As the project is in transition from mockup to full system, pay attention to the following:
*   **REAL**: User names, point balances, item types, submission status, hub capacities, district lists.
*   **PLACEHOLDER**: Environmental certificates (PDFs), exact map distances (lat/lng is stored but distance logic is static), "Processing Log" timestamps in the verification view.

### 🎨 Styling & Design System
Use the custom tokens defined in `tailwind.config.ts`. Avoid ad-hoc hex codes.
*   **Primary Green**: `bg-w2w-accent` (#16C47F)
*   **Dark Base**: `bg-w2w-base` (#071A17)
*   **Fonts**: 'Space Grotesk' for headings, 'Inter' for body text.

### 🛠️ API Patterns
Most endpoints follow a standard pattern:
1. Extract user from JWT using `getAuthUser(request)` in `src/lib/auth.ts`.
2. Perform Prisma transactions for complex updates (e.g., creating a submission while updating box availability).
3. Return standardized JSON responses.

---

## 5. Next Steps for Implementation

1.  **Pickup Flow**: Complete the `/submit/pickup` logic to allow scheduling based on `PickupSchedule` data.
2.  **Wallet/Rewards**: Build the interface for `Redemption` based on available `Reward` stock.
3.  **Admin Panel**: Create the `/admin` dashboard to allow technicians to "Verify" submissions and update weights.
4.  **Notification System**: Implement real-time status updates via webhooks or polling.

---

> [!IMPORTANT]
> **Database Management**: Use `npx prisma studio` for local data management. Ensure `DATABASE_URL` and `JWT_SECRET` are correctly set in the `.env` file before deployment.
