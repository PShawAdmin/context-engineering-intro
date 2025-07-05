# Peyton Shaw Counseling - Refined Design System

## Overview
An elegant, sophisticated design system that moves beyond typical therapy website aesthetics. Inspired by Scandinavian minimalism and warm modernism, this creates a refined, welcoming atmosphere that feels both professional and deeply personal.

## Color Palette

### Grey-Blues (Primary Tones)
- **Slate Blue** (#64748B): Main brand color, sophisticated and calming
  - Usage: Headers, navigation, important text
  - Conveys: Professionalism, trust, stability

- **Dusty Blue** (#94A3B8): Secondary blue tone
  - Usage: Subheadings, secondary elements
  - Conveys: Softness, approachability

- **Misty Blue** (#CBD5E1): Light blue-grey
  - Usage: Card backgrounds, hover states
  - Conveys: Openness, clarity

### Warm Greys (Neutral Foundation)
- **Charcoal** (#1E293B): Deep grey for contrast
  - Usage: Dark text, footer background
  - Conveys: Grounding, sophistication

- **Storm** (#475569): Medium-dark grey
  - Usage: Body text, borders
  - Conveys: Readability, balance

- **Dove** (#E2E8F0): Light warm grey
  - Usage: Section backgrounds, dividers
  - Conveys: Spaciousness, calm

### Nude Tones (Warmth & Accent)
- **Clay** (#D4A574): Primary warm accent
  - Usage: CTAs, active states, highlights
  - Conveys: Warmth, invitation, human touch

- **Sand** (#E5C4A1): Light nude tone
  - Usage: Hover states, soft backgrounds
  - Conveys: Comfort, accessibility

- **Linen** (#F5E6D3): Pale warm tone
  - Usage: Alternative section backgrounds
  - Conveys: Softness, welcome

- **Cream** (#FAF5F0): Lightest warm tone
  - Usage: Page background, cards
  - Conveys: Openness, breathing room

## Typography

### Font Families
- **Display Font**: Playfair Display - Elegant serif for sophisticated headings
  - Alternative: Cormorant Garamond for a lighter feel
- **Body Font**: Inter - Clean, modern sans-serif for excellent readability
  - Alternative: Nunito Sans for a softer feel

### Hierarchy
- H1: 4xl-6xl, regular weight, Playfair Display
- H2: 3xl-5xl, regular weight, Playfair Display  
- H3: 2xl-3xl, medium weight, Inter
- Body: base-lg, regular, Inter
- Small: sm-base, regular, Inter with increased letter-spacing

## Design Elements

### Patterns & Textures
1. **Organic Blob Shapes**: Subtle flowing shapes in nude tones
   ```css
   background: radial-gradient(circle at 20% 80%, rgba(212, 165, 116, 0.1) 0%, transparent 50%);
   ```

2. **Watercolor Overlays**: Delicate blue-grey washes
   ```css
   background: linear-gradient(135deg, rgba(148, 163, 184, 0.05) 0%, transparent 40%);
   ```

3. **Subtle Grain**: Fine texture overlay for depth
   ```css
   background-image: url("data:image/svg+xml,%3Csvg...%3E");
   opacity: 0.02;
   ```

4. **Geometric Line Patterns**: Thin, elegant line work
   ```css
   background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(148, 163, 184, 0.05) 35px, rgba(148, 163, 184, 0.05) 70px);
   ```

### Interactive Elements
1. **Buttons**:
   - Primary: Clay (#D4A574) background, charcoal text, subtle shadow lift on hover
   - Secondary: Transparent with slate blue border, transitions to misty blue fill
   - Ghost: No border, underline appears on hover in clay color

2. **Cards**:
   - Cream or dove grey backgrounds
   - No visible borders, rely on subtle shadows
   - Organic shape accent in top corner
   - Gentle scale (1.02) and shadow increase on hover

3. **Navigation**:
   - Transparent with backdrop-filter blur
   - Slate blue text, clay accent on active/hover
   - Subtle underline animation on hover
   - Refined mobile menu with slide animation

## Component Styling

### Hero Section
- Cream background with watercolor overlay
- Large, elegant serif typography
- Subtle organic shapes in background
- Clay-colored CTA button with charcoal text
- Soft divider with organic curve

### Service Cards
- Alternating cream and dove backgrounds
- Minimal iconography in slate blue
- Generous white space
- Clay accent on hover
- No visible borders, subtle shadow only

### Testimonials
- Quote marks in clay color
- Italic serif font for quotes
- Simple avatar with soft shadow
- Minimal star display in dusty blue
- Organic shape accent

### Footer
- Charcoal background for elegant contrast
- Thin clay accent line at top
- Refined typography with ample spacing
- Social icons with subtle hover effects

## Section Treatments

### Alternating Backgrounds
- Primary sections: Cream (#FAF5F0)
- Secondary sections: Soft linen (#F5E6D3) with watercolor overlay
- Feature sections: Dove grey (#E2E8F0) with organic pattern

### Section Dividers
- Organic curves rather than straight lines
- Subtle color transitions
- Optional decorative element at intersection

## Micro-interactions
- Subtle parallax on scroll for patterns
- Gentle fade-in on viewport entry
- Smooth color transitions (300ms ease)
- Refined hover states with minimal movement
- Focus states with clay-colored outline

## Accessibility & Performance
- WCAG AA compliant color combinations
- Clear focus indicators in clay accent
- Reduced motion options for patterns
- Optimized SVG patterns for performance
- Semantic HTML structure throughout

## Implementation Guidelines

### CSS Variables
```css
--slate-blue: #64748B;
--dusty-blue: #94A3B8;
--misty-blue: #CBD5E1;
--charcoal: #1E293B;
--storm: #475569;
--dove: #E2E8F0;
--clay: #D4A574;
--sand: #E5C4A1;
--linen: #F5E6D3;
--cream: #FAF5F0;
```

### Pattern Classes
- `.pattern-watercolor`: Subtle watercolor background
- `.pattern-grain`: Fine texture overlay
- `.pattern-organic`: Blob shape accents
- `.pattern-geometric`: Delicate line work

## Design Philosophy
This refined aesthetic creates a sophisticated therapy practice presence that:
- Feels elevated and professional without being cold
- Uses warmth through nude tones rather than bright colors
- Creates visual interest through texture and pattern, not bold colors
- Maintains excellent readability with thoughtful typography
- Provides clear navigation without aggressive CTAs
- Builds trust through consistency and elegance

The result is a website that feels like a high-end wellness space - calming, sophisticated, and deeply welcoming.