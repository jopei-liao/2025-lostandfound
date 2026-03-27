# 🔍 Lost and Found - Item Tracking System

![Deploy Status](https://github.com/jopei-liao/2025-lostandfound/actions/workflows/static.yml/badge.svg)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A lightweight Lost and Found tracking system built with React. This project serves as a sub-project of my personal portfolio `jopei-liao.github.io`, demonstrating frontend integration with Google Sheets and automated CI/CD workflows.

🔗 **[View Live Demo](https://jopei-liao.github.io/lostandfound/)**

---

## ✨ Features

- **Real-time Recording**: Automatically synchronizes form data to Google Sheets via Google Apps Script.
- **Visit Analytics**: Automatically logs user entry timestamps for future data analysis.
- **Automated Deployment**: Integrated with GitHub Actions to trigger builds and deploys to a specific sub-directory upon pushing to the `master` branch.
- **Environment Variable Protection**: Uses Vite environment variables and GitHub Secrets to keep API endpoints secure and injects them dynamically during the CI/CD process.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Backend / DB**: Google Sheets API & Google Apps Script
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

---

## 🚀 Getting Started

### Local Development Steps

1. **Clone the Project**
   `git clone https://github.com/jopei-liao/lostandfound.git`
   `cd lostandfound`

2. **Install Dependencies**
   `npm install`

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add your API URL:
   `VITE_GOOGLE_SHEET_API_URL=YOUR_GOOGLE_APPS_SCRIPT_URL`

4. **Start Development Server**
   `npm run dev`

---

## ⚙️ Automation Workflow

To maintain a clean main portfolio while managing multiple sub-projects, this repository uses the following deployment architecture:

- **Independent Path**: The project is automatically built and pushed to the `/lostandfound` directory within the `jopei-liao.github.io` repository.
- **Exclusion Mechanism**: The main portfolio's GitHub Actions is configured with `clean-exclude` to ensure this project is not deleted during main site updates.
- **Security Isolation**: The API URL is stored only in GitHub Secrets. Even if the source code is public, the backend endpoints remain protected.

---

## 📄 License

This project is licensed under the ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg).

---

## 👤 Contact

**Jopei Liao**

- GitHub: [jopei-liao](https://github.com/jopei-liao)
- Email: [jopei.liao@gmaiol.com](jopei.liao@gmaiol.com)
- Portfolio: [jopei-liao.github.io](https://jopei-liao.github.io/)
