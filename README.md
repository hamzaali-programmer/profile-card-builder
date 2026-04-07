# Profile Card Builder

A frontend technical interview task — a single-page Profile Card Builder where users fill out a form and see a live card preview update dynamically.

## How to Run

**HTML / CSS / JS Part:**
Open `index.html` directly in any modern browser (Chrome, Firefox, Edge). No build tool needed.

**React Part:**
Open `react/ProfileCard.jsx` in [StackBlitz](https://stackblitz.com) or run locally with Vite:
```bash
npm create vite@latest my-app -- --template react
# Replace src/App.jsx with react/ProfileCard.jsx content
npm install && npm run dev
```

## Tech Used

- HTML5 (semantic: `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<textarea>`, `<button>`)
- CSS3 — mobile-first, ID/class specificity demo, child & descendant selectors, `@media` breakpoints
- Vanilla JavaScript — DOM manipulation, form events, `preventDefault()`, inline validation
- React — functional component, props, `.map()` for skill tags, `useState` (bonus)

## Features Implemented

- **Two-panel layout** — Form on left, live card preview on right
- **CSS Specificity** — `.card__name` (class) is overridden by `#cardName` (ID selector)
- **Selectors** — child selector `.card__body > .card__title`, descendant `.card__body .card__bio`
- **Mobile-first** — base styles for mobile, expanded at `768px` and `1024px`
- **Form validation** — inline error messages (no `alert()`)
- **Dynamic skill tags** — checkbox loop → `createElement` + `appendChild`
- **Live name update** — `input` event listener (bonus)
- **Color picker** — updates avatar background via JS in real-time

## Folder Structure

```
profile-card-builder/
├── index.html
├── styles/
│   └── main.css
├── script.js
├── react/
│   └── ProfileCard.jsx
└── README.md
```

## Time Taken

~55 minutes

## What I'd Improve

- Add SCSS with variables/nesting (started with CSS for correctness, as advised)
- Add smooth card entry animation on first generation
- Add localStorage so the card persists on page refresh
- Add an avatar image upload option (FileReader API)
- Write unit tests for the validation logic