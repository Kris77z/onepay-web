OnePay Web Landing (Next.js + Tailwind v4)

## Features
- Pure landing page: Navbar, Hero (Three.js shader + GSAP), Pricing (static), FAQ (static), Footer
- English only, no auth/payment/i18n
- Responsive layout with Tailwind CSS v4

## Tech Stack
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- three.js + @react-three/fiber + @react-three/drei
- gsap + @gsap/react + split-type

## Development
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Project Structure
```
src/
  app/
    layout.tsx
    page.tsx          # Assemble sections
    globals.css       # Tailwind v4 theme vars
  components/
    sections/
      navbar.tsx
      hero.tsx
      pricing.tsx
      faq.tsx
      footer.tsx
public/
  images/onepay.png
  avatar/{2,4,5}.png
```

## Notes
- Login button links to `#login` placeholder
- Navbar items scroll to `#pricing` and `#faq`
- You can update copy directly in components for now
