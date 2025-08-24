# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal website project for creating a static HTML resume website using pure HTML, CSS, and JavaScript. The site will showcase professional qualifications for overseas marketing manager positions.

## Key Documents

- `docs/resume.md` - Contains professional resume in markdown format (Chinese/English)
- `docs/jd.md` - Target job description for overseas marketing manager role

## Development Commands

Since this is a static HTML website, you can serve it locally using Python's built-in server:

```bash
# For Python 3.x (recommended)
python -m http.server 8000

# For Python 2.x (if needed)
python -m SimpleHTTPServer 8000
```

The website will be accessible at `http://localhost:8000`

## Website Structure

The website is built as a single-page application with bilingual support:
- `index.html` - Main HTML structure with dual language support (Chinese/English)
- `styles.css` - Responsive CSS with CSS custom properties and modern design system
- `script.js` - Interactive JavaScript with class-based architecture for language switching, navigation, animations, and scroll effects

## Code Architecture

The JavaScript code follows a modular class-based approach:
- `LanguageManager` - Handles bilingual content switching
- `NavigationManager` - Mobile navigation and scroll effects
- `AnimationManager` - Scroll animations and counters
- Uses data attributes (`data-zh`, `data-en`) for bilingual content management

## Target Audience

The website is designed for:
- Overseas marketing manager positions
- International market expansion roles
- Social media and growth marketing roles in B2B/B2C companies

## Key Features to Highlight

Based on the resume content, emphasize:
- Cross-border marketing experience (2+ years)
- Social media matrix operations (YouTube, TikTok, Instagram, etc.)
- B2B international trade background
- Bilingual content creation capabilities
- Data-driven growth strategies
- GTM (Go-To-Market) strategy experience

## Content Management

- All text content uses bilingual data attributes system
- Resume content is sourced from `docs/resume.md` 
- Job requirements reference from `docs/jd.md`
- Professional achievements are quantified (30+ monthly leads, 15%+ growth, etc.)
- Contact information and social links need to be updated with actual profiles

## Design System

The CSS uses a comprehensive design system with:
- CSS custom properties for consistent theming
- Gradient color schemes (purple/pink primary palette)
- Responsive typography scale
- Component-based styling approach
- Mobile-first responsive design