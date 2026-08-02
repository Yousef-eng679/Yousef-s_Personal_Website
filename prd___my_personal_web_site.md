 Overview
This project involves building a personal portfolio website for Yousef, a student developer, to showcase software engineering projects, research papers, and AI-applied skills. The site will feature a high-fidelity, interactive "dark mode" UI with blur-lighting effects, organized into distinct "Labs" for content categorization. A custom admin dashboard will be integrated via Supabase to allow for dynamic content management of portfolio items across different site sections.

 Epics

 Epic : Core Content Infrastructure
Establish the database schema, authentication, and the admin dashboard to enable content management.

 Epic : Frontend Experience & Labs
Implement the interactive dark-mode UI, navigation logic, and the "Labs" content architecture.

 User Stories

 Epic : Core Content Infrastructure

Story .: Admin Authentication
 As an admin, I want to log into a secure dashboard, so that I can manage my portfolio content without unauthorized access.
 Size: S — Standard Supabase Auth implementation.
 Definition of Done:
 Given a login page, when valid credentials are provided, then the user is redirected to the dashboard.
 Given an unauthenticated state, when accessing `/admin`, then the user is redirected to the login page.

Story .: Content Management (CRUD)
 As an admin, I want to upload project details (images, videos, descriptions, links) and assign them to specific "Labs" or the "Main Grabber," so that I can control where content appears on the site.
 Size: M — Requires schema design for polymorphic content (Lab vs. Main page) and file storage integration.
 Definition of Done:
 Given a project entry, when saved in the dashboard, then the record is correctly persisted in Supabase with the associated "Lab" category tag.
 Given a project assigned to the "Main Grabber," when the main page is fetched, then the project appears in the featured section.

 Epic : Frontend Experience & Labs

Story .: Lab-Based Navigation & Layout
 As a visitor, I want to navigate through distinct "Labs" (Software Engineering, Research/Content), so that I can explore specific categories of work without feeling overwhelmed.
 Size: M — Requires dynamic routing based on the "Lab" category.
 Definition of Done:
 Given a URL path `/labs/[lab-name]`, when the page loads, then only content tagged with that specific lab is rendered.
 Given the main landing page, when loaded, then it displays a summary of content from all labs.

Story .: Interactive Dark-Mode UI
 As a visitor, I want to view a dark-themed interface with blur-lighting effects and animations, so that the site feels modern and engaging.
 Size: L — High-fidelity UI work; requires CSS/Framer Motion implementation for blur effects and scroll-based animations.
 Definition of Done:
 Given the site theme, when rendered, then the background must utilize the specified dark/green/blurry-white palette.
 Given a user interaction (e.g., scroll/hover), when triggered, then the defined interactive animations must play.

 Assumptions
 ASSUMPTION: The "green" color palette refers to a "terminal-style" or "soft-neon" green suitable for dark mode.
 ASSUMPTION: The "Main Grabber" on the landing page will display a maximum of - featured items to maintain performance.
 ASSUMPTION: All media (images/videos) will be hosted in Supabase Storage.
 ASSUMPTION: The site will be built using a modern framework (e.g., Next.js) to support the required animations and Supabase integration.

 Open Questions
 Content Schema: Should a single project be allowed to exist in multiple "Labs" simultaneously, or is it strictly one-to-one?
 Media Handling: Are there specific file size limits for video uploads to the admin dashboard to prevent storage bloat?
 Navigation: Should the "Introduction" at the start of the page be a static component or a dynamic "hero" section that can be updated via the dashboard?