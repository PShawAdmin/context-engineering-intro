# FAQ Filter & Expansion Fix

## Problem
When filtering FAQs by category (e.g., selecting "Privacy"), the accordion items would not expand when clicked. This only occurred when filtering - the "All Questions" view worked fine.

## Root Cause
The issue was caused by the accordion component losing track of expansion state when the filtered items changed. The uncontrolled accordion couldn't properly handle dynamic item lists.

## Solution Implemented

### 1. **Restored Controlled State Management**
```typescript
const [expandedKeys, setExpandedKeys] = useState<Selection>(new Set());
```

### 2. **Added Filtered Expanded Keys Logic**
Created a computed value that only includes expanded keys for items currently visible:
```typescript
const filteredExpandedKeys = useMemo(() => {
  if (expandedKeys === 'all') return 'all';
  
  const filteredIds = new Set(filteredFAQs.map(item => item.id));
  const currentExpanded = expandedKeys as Set<string>;
  const filtered = new Set<string>();
  
  currentExpanded.forEach(key => {
    if (filteredIds.has(key)) {
      filtered.add(key);
    }
  });
  
  return filtered;
}, [expandedKeys, filteredFAQs]);
```

### 3. **Updated Accordion Props**
```typescript
<Accordion 
  variant="bordered"
  selectionMode="multiple"
  selectedKeys={filteredExpandedKeys}
  onSelectionChange={handleSelectionChange}
  className="mb-12"
>
```

## How It Works
1. User expands FAQ items - state is tracked in `expandedKeys`
2. User changes filter - `filteredFAQs` updates
3. `filteredExpandedKeys` computes which expanded items are still visible
4. Accordion shows only relevant expanded items
5. Expansion state persists when switching back to previous filters

## Benefits
- ✅ FAQ items expand properly in all filter views
- ✅ Expansion state is maintained across filter changes
- ✅ Clean separation of concerns
- ✅ No console errors or warnings

## Testing Scenarios
1. Expand items in "All Questions" → Switch to category → Items in that category remain expanded
2. Expand item in specific category → Switch to "All Questions" → Item remains expanded
3. Expand item in one category → Switch to different category → Switch back → Item still expanded