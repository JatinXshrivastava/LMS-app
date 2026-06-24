# Edemy - LMS Frontend

Hey there! This is the frontend part of our LMS (Learning Management System) project called Edemy. It's built with React, Vite, and Tailwind CSS. 

We designed the main student pages to look clean and work well on both desktops and mobile phones.

## Features we built:
* **Home Page:** Has a hero section, search bar, list of partner companies, top courses grid, testimonials, and a custom footer.
* **Course List:** A page that lets you search and filter through all our available courses. It has a responsive grid and a clear search button.
* **Course Details:** Shows the full info of a course, pricing (with discounts), a working YouTube video preview modal, and a clean dropdown accordion for the syllabus/chapters.
* **My Enrollments:** Shows the list of courses you are currently taking, including a visual progress bar (using `rc-progress`) to see how much you completed.
* **Course Player:** A custom layout with a main YouTube video frame on the left, and a chapter/lecture sidebar on the right. You can select lectures and tick off circular checkboxes to mark them as done, which updates your enrollment progress!

## How to run it locally:

1. **Install dependencies:**
   Make sure you have Node installed, then run:
   ```bash
   npm install
   # or if you use bun
   bun install
   ```

2. **Run the dev server:**
   Start the Vite local development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```
   Now open your browser and go to `http://localhost:5173`.

3. **Build for production:**
   To verify everything compiles cleanly, run:
   ```bash
   npm run build
   ```

## Note on State Management:
To keep the component files clean and readable, we moved all state variables (like video modals, active lectures, completed lessons, and search filters) and `useEffect` triggers into `src/context/AppContext.tsx`. The components just import what they need using the `useContext` hook.
