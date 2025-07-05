# FAQ Accordion Fix Implementation PRP

## Context
The FAQ accordion on the Peyton Shaw Counseling website is experiencing two critical issues:
1. Accordion items don't expand when clicked
2. Filter tabs are not functioning properly

## Research Findings

### Known Issues & Solutions
1. **Client Component Issue**: HeroUI components require 'use client' directive in Next.js 14 App Router
2. **Fast Click Bug**: Known issue in HeroUI where rapid clicking breaks accordion (GitHub issue #2727)
3. **Focus Stealing**: Accordion can steal focus from nested inputs (GitHub issue #3478)
4. **State Management**: Tabs require proper controlled state management with `selectedKey` and `onSelectionChange`

### Documentation References
- HeroUI Accordion Docs: https://www.heroui.com/docs/components/accordion
- HeroUI Tabs Docs: https://www.heroui.com/docs/components/tabs
- HeroUI Next.js Setup: https://www.heroui.com/docs/frameworks/nextjs

## Current Implementation Details

### File Structure
```
/peyton-shaw-counseling/
├── app/
│   ├── (marketing)/
│   │   └── faq/
│   │       └── page.tsx          # FAQ page with accordion and tabs
│   ├── providers.tsx             # HeroUI provider wrapper
│   └── layout.tsx               # Root layout with providers
├── lib/
│   ├── constants.ts             # FAQ data items
│   └── types.ts                 # FAQItem interface
└── package.json                 # Dependencies (HeroUI 2.0.0)
```

### Current FAQ Component Structure
```typescript
// Simplified structure from /app/(marketing)/faq/page.tsx
export default function FAQPage() {
  const [selectedKey, setSelectedKey] = useState("all");
  
  // Group FAQs by category
  const groupedFAQs = /* grouping logic */;
  
  // Filter FAQs based on selected tab
  const filteredFAQs = selectedKey === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedKey);
  
  return (
    <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      {/* Tab items */}
    </Tabs>
    <Accordion variant="bordered" selectionMode="multiple">
      {/* Accordion items */}
    </Accordion>
  );
}
```

## Implementation Blueprint

### Step 1: Add Client Directive
```typescript
// app/(marketing)/faq/page.tsx
'use client';  // Add this at the very top of the file

import { useState } from 'react';
// ... rest of imports
```

### Step 2: Fix State Management
```typescript
// Ensure proper typing and state handling
const [selectedKey, setSelectedKey] = useState<string>("all");
const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

// Handle tab selection with proper typing
const handleTabChange = (key: Key) => {
  setSelectedKey(key.toString());
};

// Optional: Handle accordion expansion
const handleAccordionChange = (keys: Selection) => {
  if (keys === "all") {
    setExpandedKeys(new Set(faqItems.map(item => item.id)));
  } else {
    setExpandedKeys(new Set(Array.from(keys).map(key => key.toString())));
  }
};
```

### Step 3: Update Component Implementation
```typescript
<Tabs 
  aria-label="FAQ Categories"
  selectedKey={selectedKey}
  onSelectionChange={handleTabChange}
  classNames={{
    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
    cursor: "w-full bg-nude-clay",
    tab: "max-w-fit px-0 h-12",
    tabContent: "group-data-[selected=true]:text-nude-clay"
  }}
>
  <Tab key="all" title="All Questions" />
  {Object.keys(groupedFAQs).map((category) => (
    <Tab key={category} title={category} />
  ))}
</Tabs>

<Accordion 
  variant="bordered"
  selectionMode="multiple"
  selectedKeys={expandedKeys}
  onSelectionChange={handleAccordionChange}
  className="mb-12"
>
  {filteredFAQs.map((item) => (
    <AccordionItem
      key={item.id}
      aria-label={item.question}
      title={/* existing title JSX */}
      classNames={{
        trigger: "px-4 py-4 hover:bg-background-dove transition-colors",
        title: "font-normal text-base",
        content: "px-8 pb-4 text-text-storm"
      }}
    >
      <div className="text-text-storm">
        {item.answer}
      </div>
    </AccordionItem>
  ))}
</Accordion>
```

### Step 4: Debug Enhancements
```typescript
// Add debug logging (remove after fixing)
useEffect(() => {
  console.log('Selected tab:', selectedKey);
  console.log('Filtered FAQs count:', filteredFAQs.length);
  console.log('Expanded keys:', Array.from(expandedKeys));
}, [selectedKey, filteredFAQs, expandedKeys]);
```

### Step 5: Provider Verification
Check `/app/providers.tsx`:
```typescript
'use client';

import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
```

## Error Handling Strategy

### 1. Hydration Mismatch Prevention
```typescript
// Use dynamic import if hydration issues occur
import dynamic from 'next/dynamic';

const FAQAccordion = dynamic(
  () => import('@/components/FAQAccordion'),
  { ssr: false }
);
```

### 2. Click Event Debugging
```typescript
// Temporary debug wrapper for accordion items
const handleAccordionClick = (e: React.MouseEvent, itemId: string) => {
  console.log('Accordion clicked:', itemId);
  e.stopPropagation(); // Prevent event bubbling issues
};
```

### 3. Fallback Implementation
If HeroUI components continue to fail, implement a custom accordion:
```typescript
// Simple custom accordion as fallback
const [openItems, setOpenItems] = useState<Set<string>>(new Set());

const toggleItem = (id: string) => {
  const newOpenItems = new Set(openItems);
  if (newOpenItems.has(id)) {
    newOpenItems.delete(id);
  } else {
    newOpenItems.add(id);
  }
  setOpenItems(newOpenItems);
};
```

## Validation Gates

```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Build verification
npm run build

# 4. Manual testing checklist
# - [ ] Accordion items expand on click
# - [ ] Multiple items can be expanded
# - [ ] Filter tabs switch content
# - [ ] No console errors
# - [ ] Keyboard navigation works
# - [ ] Mobile touch events work
```

## Implementation Tasks (In Order)

1. **Add 'use client' directive** to `/app/(marketing)/faq/page.tsx`
2. **Update state management** with proper TypeScript types
3. **Implement controlled accordion** with selectedKeys prop
4. **Fix tab selection handler** with proper Key type handling
5. **Add debug logging** to identify any remaining issues
6. **Test all interactions** (click, keyboard, touch)
7. **Remove debug code** after verification
8. **Run validation checks** (lint, typecheck, build)
9. **Test on multiple browsers** and devices
10. **Document any workarounds** if implemented

## Additional Considerations

### Performance Optimization
- Consider memoizing filtered FAQs with `useMemo`
- Lazy load accordion content if FAQ list grows large
- Add loading states for better UX

### Accessibility
- Ensure all ARIA labels are present
- Test with screen readers
- Verify keyboard navigation (Tab, Enter, Space, Arrow keys)

### Future Enhancements
- Add search functionality
- Implement expand/collapse all button
- Add analytics tracking for FAQ interactions
- Consider URL-based tab state for bookmarking

## Success Criteria
- [ ] All accordion items expand/collapse on click
- [ ] Filter tabs properly filter FAQ items
- [ ] No JavaScript console errors
- [ ] Smooth animations and transitions
- [ ] Works on all major browsers
- [ ] Passes all validation gates

## Confidence Score: 9/10
This PRP provides comprehensive guidance for fixing the FAQ accordion issues. The high confidence comes from:
- Clear identification of the root cause (missing 'use client' directive)
- Detailed implementation steps with code examples
- Multiple fallback strategies
- Clear validation criteria
- Based on documented HeroUI issues and solutions