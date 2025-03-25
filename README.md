# Mood Journal AI - Next.js App

## 📌 Overview
Mood Journal AI is an intelligent journaling application built with Next.js, TypeScript, and MongoDB using Prisma as the ORM. The app allows users to document their thoughts and emotions through journal entries. AI-powered analysis using LangChain and OpenAI provides insights such as mood tracking, sentiment analysis, and contextual summaries. User authentication is handled through Clerk.

## 🚀 Features
- **User Authentication:** Powered by Clerk for secure login and signup.
- **AI-Powered Insights:** OpenAI analyzes journal entries to determine mood, subject, summary, and sentiment.
- **Automated Saving:** Journal entries auto-save after users stop typing.
- **Sentiment Tracking:** A graphical history page visualizes mood trends over time.
- **AI-Powered Query:** Users can ask AI questions about their past entries.

---

## 🏗️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Database:** MongoDB with Prisma ORM ([Prisma Docs](https://www.prisma.io/docs))
- **Authentication:** Clerk ([Clerk Docs](https://clerk.dev/docs))
- **AI & NLP:** LangChain + OpenAI ([LangChain Docs](https://python.langchain.com/docs/), [OpenAI Docs](https://platform.openai.com/docs/))
- **Schema Validation:** Zod ([Zod Docs](https://zod.dev/))

---

## 📥 Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harsh2563/Mood.git
   cd Mood
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:** Create a `.env` file and add the necessary environment variables for Clerk, Prisma, OpenAI, and MongoDB.
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🏠 App Pages & Flow

### 1️⃣ Home Page
- Displays a **Get Started** button.
- Clicking redirects to Clerk’s authentication page.

### 2️⃣ Authentication Page (Clerk)
- Users can **log in or sign up**.
- On successful authentication, users are redirected to the **dashboard/homepage**.

### 3️⃣ Dashboard (Main Page)
- Left Sidebar:
  - **Home**: Default landing page after login.
  - **Journal**: Shows user-created journal entries.
  - **History**: Visualizes past mood trends.
- Right Section:
  - **AI Chat Input**: Users can ask AI about their past journal entries.
  - **New Entry Card**: Clicking creates a new journal entry.
  - **Previous Entries**: Displays past user journal entries.

### 4️⃣ New Entry Page
- **Left Side**:
  - Input field for writing journal entries.
  - Auto-save feature to store entries automatically after the user stops typing.
- **Right Side (AI Insights Panel)**:
  - Displays AI-generated analysis:
    - **Summary**
    - **Subject**
    - **Mood Analysis**
    - **Sentiment Classification** (Positive/Negative)

### 5️⃣ History Page
- **Graphical representation of mood trends over time**.
- Uses sentiment scores to plot a **mood graph** based on past journal entries.

---

## 📖 Schema & Data Handling
- Uses **Zod** for structured AI responses.
- Ensures AI outputs follow a defined schema for accurate analysis.

---

## 📌 Future Enhancements
- Custom AI models for deeper emotional analysis.
- Integration with voice input for journaling.
- More visualization tools for tracking emotions.

---

## 📞 Contact
For any issues, feel free to open a discussion or reach out!

---

### 📷 Screenshots
![Home Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1742924143/Screenshot_2025-03-25_223547_ke8bw2.png)
![Login Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1742924145/Screenshot_2025-03-25_223723_edoyf8.png)
![Dashboard](https://res.cloudinary.com/dge7dzxe0/image/upload/v1742924143/Screenshot_2025-03-25_223938_k41jom.png)
![Journal Entry](https://res.cloudinary.com/dge7dzxe0/image/upload/v1742924143/Screenshot_2025-03-25_224246_qdd3to.png)
![History Graph](https://res.cloudinary.com/dge7dzxe0/image/upload/v1742924143/Screenshot_2025-03-25_224514_icgnic.png)

---

Happy journaling! ✨

