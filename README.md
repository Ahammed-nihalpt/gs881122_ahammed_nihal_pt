# GS881122_Ahammed_Nihal_PT

## Project Overview

This is a Progressive Web App (PWA) developed as part of the **GSynergy Typescript React Challenge**. The application enables users to manipulate and analyze data using AG-Grid, perform calculations, apply conditional formatting, and visualize data through charts.

## Live Demo

🔗 **Deployed Application**: [GS881122_Ahammed_Nihal_PT](https://gs881122-ahammed-nihal-pt.vercel.app)

🔗 **GitHub Repository**: [GitHub Repo](https://github.com/Ahammed-nihalpt/gs881122_ahammed_nihal_pt)

## Tech Stack

- **Frontend**: React (v19.0.0), Redux Toolkit (v2.6.0), React Router DOM (v7.3.0)
- **State Management**: Redux Toolkit
- **UI Components**: MUI Icons, TailwindCSS
- **Drag & Drop**: DnD Kit
- **Data Grid**: AG-Grid
- **Charting**: Recharts
- **Build Tool**: Vite

## System Requirements

- **Node.js**: 18.x or later
- **NPM**: 9.x or later
- **Works on**: Windows, macOS, Linux

## Installation & Setup

### Prerequisites

No special prerequisites are required apart from Node.js and npm/yarn.

### 📂 Project Folder Structure

The project follows a well-organized folder structure for maintainability and scalability.

- The **`public/`** folder contains static assets.
- The **`src/`** directory houses the core application logic, with **`components/`** containing reusable UI elements.
  - **`DataTable/`** manages data grid functionality.
  - **`Sidebar/`** includes components like **`GMChart.tsx`** for chart visualization, **`Modal.tsx`** for popups, and **`Navbar.tsx`** for navigation.
  - The **`PlanningScreen/`** component handles the main planning interface.
- Global state management is handled in **`store/`**, with Redux slices inside **`store/slices/`**.
- The **`hooks/`** directory contains custom React hooks, while **`utils/`** stores helper functions.
- TypeScript type definitions are maintained in **`types/`**.
- The application entry point is in **`main.tsx`**, with the root component in **`App.tsx`** and global styles in **`index.css`**.

### Steps to Run Locally

1. **Clone the repository**
   ```sh
   git clone https://github.com/Ahammed-nihalpt/gs881122_ahammed_nihal_pt.git
   cd gs881122_ahammed_nihal_pt
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the development server**
   ```sh
   npm run dev
   ```
4. **Build the application**
   ```sh
   npm run build
   ```
5. **Preview production build**
   ```sh
   npm run preview
   ```

## Features Implemented

✔ **Data Grid using AG-Grid**
✔ **Charts using Recharts**
✔ **State Management with Redux Toolkit**
✔ **Dynamic Planning Data Management**
✔ **Drag & Drop Sorting with DnD Kit**
✔ **Modern Styling with TailwindCSS**

## What Could Be Improved

If given more time, I would have:

- **Added Authentication**: Implemented Firebase or JWT-based authentication.
- **Backend & Database**: Integrated a backend (Node.js/Express) with a database (PostgreSQL or MongoDB) for persistent data storage.
- **UI Improvements**: Enhanced user interface and experience.
- **Sample Data Import**: Allowed users to prepopulate the application with sample data.
- **Jest Unit Tests**: Added test cases to improve reliability.

## Deployment

- **Hosting Platform**: [Vercel](https://vercel.com/)
- **Deployment Command**: Push to GitHub, and Vercel automatically deploys the latest version.

## Feedback on the Challenge

The challenge was well-structured and effectively assessed core React and frontend development skills. Providing sample data in JSON format would make testing easier.

---

Developed with dedication by **Ahammed Nihal PT** 🚀
