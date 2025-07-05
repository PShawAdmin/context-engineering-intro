# FAQ Filter Bar Design Options

## Current Implementation (Underlined Style)
I've updated the filter bar with an underlined style that:
- Uses a thin underline indicator (0.5 height) instead of a full background block
- Shows the selected text in the accent color (nude-clay) with semibold font
- Unselected tabs are in storm gray with hover opacity effect
- Clean bottom border for the entire tab list

## Alternative Design Options

### Option 1: Pill Style (Modern & Clean)
```typescript
classNames={{
  base: "w-full",
  tabList: "gap-2 w-full relative rounded-none p-1 bg-background-dove",
  cursor: "bg-white shadow-small",
  tab: "max-w-fit px-6 h-10 text-sm data-[hover-unselected=true]:opacity-70",
  tabContent: "text-text-storm font-medium transition-all group-data-[selected=true]:text-nude-clay"
}}
```

### Option 2: Bordered Chips
```typescript
classNames={{
  base: "w-full",
  tabList: "gap-3 w-full relative rounded-none p-0",
  cursor: "bg-transparent",
  tab: "max-w-fit px-4 h-10 border-2 border-transparent rounded-full data-[selected=true]:border-nude-clay data-[hover-unselected=true]:border-nude-sand/50",
  tabContent: "text-text-storm font-medium transition-all group-data-[selected=true]:text-nude-clay"
}}
```

### Option 3: Gradient Accent
```typescript
classNames={{
  base: "w-full",
  tabList: "gap-4 w-full relative rounded-none p-0 border-b-2 border-nude-sand/20",
  cursor: "w-full bg-gradient-to-r from-nude-clay to-nude-clay/70 h-1 bottom-0 rounded-t-full",
  tab: "max-w-fit px-2 h-12 data-[hover-unselected=true]:opacity-70",
  tabContent: "text-text-storm font-medium transition-all group-data-[selected=true]:text-text-charcoal group-data-[selected=true]:font-semibold"
}}
```

### Option 4: Minimal with Dot Indicator
```typescript
classNames={{
  base: "w-full",
  tabList: "gap-8 w-full relative rounded-none p-0",
  cursor: "hidden",
  tab: "max-w-fit px-0 h-12 relative",
  tabContent: "text-text-storm font-medium transition-all group-data-[selected=true]:text-nude-clay group-data-[selected=true]:font-semibold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-nude-clay after:opacity-0 group-data-[selected=true]:after:opacity-100 after:transition-opacity"
}}
```

## Implemented Solution
The current implementation uses the underlined style which:
- ✅ Doesn't block the text with a solid color
- ✅ Provides clear visual indication of selection
- ✅ Maintains readability
- ✅ Includes smooth transitions
- ✅ Works well with the site's design system

The thin underline indicator in the accent color provides a clean, professional look that doesn't overwhelm the text content.