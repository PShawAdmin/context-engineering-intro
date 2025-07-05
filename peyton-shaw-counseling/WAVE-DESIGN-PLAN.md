# Wave Animation Design Plan

## Research Findings
After researching modern wave animations, the best approaches for 2024 include:

1. **Multi-layer Organic Movement**: Instead of simple translation, use subtle morphing with opacity layers
2. **SVG Filters**: Use turbulence filters for natural, water-like movement
3. **Clip-path Animations**: Create smooth transitions with animated clip-paths
4. **Gradient Overlays**: Add depth with animated gradients

## Proposed Design

### Approach 1: Subtle Morphing Waves (Recommended)
- **Base Layer**: Static wave for stability
- **Morphing Layer**: Gentle shape morphing using CSS transforms
- **Atmosphere Layer**: Very subtle gradient animation for depth
- **Filter Layer**: Optional SVG turbulence for organic feel

### Key Principles:
1. **Subtlety**: Movement should be barely noticeable but add life
2. **Performance**: Use CSS transforms and opacity for GPU acceleration
3. **Seamlessness**: No gaps or harsh transitions
4. **Elegance**: Matches the refined aesthetic of the site

### Technical Implementation:
```css
/* Gentle vertical breathing */
@keyframes wave-breathe {
  0%, 100% { transform: translateY(0) scaleY(1); }
  50% { transform: translateY(-3px) scaleY(1.05); }
}

/* Subtle horizontal drift */
@keyframes wave-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}

/* Opacity pulse for depth */
@keyframes wave-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
```

### Color Strategy:
- Use the exact `background-dove` color for seamless blending
- Add very subtle shadows for depth (not black, but darker dove)
- Consider a slight gradient within the wave itself

### Animation Timing:
- Primary: 8-10s for main movement (slow and graceful)
- Secondary: 12-15s for drift effects
- Tertiary: 20s for very subtle background effects
- Use ease-in-out for natural movement

## Alternative Approaches:

### Approach 2: Liquid Morph Effect
- Use clip-path with multiple points
- Animate the clip-path points individually
- Creates a more dynamic, liquid effect

### Approach 3: Noise Pattern
- SVG turbulence filter
- Very subtle displacement
- Most realistic water effect but more complex

## Recommendation:
Start with Approach 1 (Subtle Morphing Waves) as it:
- Matches the elegant aesthetic
- Performs well
- Is easier to control
- Creates the sophisticated look you want