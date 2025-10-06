# Nanny Service App 👶

A React + TypeScript application for finding and managing favorite nannies.
The app allows users to browse nannies, filter and sort them, and save favorites — with Firebase authentication for secure access.

## Features 🚀

🔹 Pages

- Home – site title, company slogan, and a “Get Started” button linking to the “Nannies” page.

- Nannies – list of nannies with:
  Sorting by name (A–Z / Z–A)
  Sorting by popularity (rating ↑ / ↓)
  Filtering by price
  Pagination (3 cards at a time + “Load more”)

- Favorites – private page with saved favorite nannies (available only for authorized users)

## Data Storage 💾

Firebase Realtime Database / Firestore used for:
Fetching nanny data
Storing user authentication info
LocalStorage optionally used for storing favorites (depending on user auth status)

## Theme Customization 🎨

The app supports three color themes:
🟥 Red, 🟦 Blue, and 🟩 Green.

How it works:
Implemented using React Context API (ThemeContext)
Users can easily change the theme by clicking the user icon in the header and selecting a color option from the dropdown.
The selected theme is applied instantly and remains active during the session, providing a personalized look and feel.

## Tech Stack 🧩

| Technology                         | Purpose                          |
| ---------------------------------- | -------------------------------- |
| **React + TypeScript**             | Core UI and type safety          |
| **Vite**                           | Fast development environment     |
| **Firebase**                       | Authentication & Database        |
| **React Hook Form + Yup**          | Form management and validation   |
| **React Router DOM**               | Routing between pages            |
| **CSS / SCSS / styled-components** | Styling (based on design mockup) |
