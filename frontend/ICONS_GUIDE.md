# Lucide React Icons Guide

## What's Been Added

Your app now uses **lucide-react** icons for a professional, modern UI. Icons have been added in the following components:

### ✅ Submit Button
- **Send** icon - for submitting pipelines
- **Loader** icon - animated spinner while submitting
- **CheckCircle** icon - success feedback
- **XCircle** icon - error feedback
- **AlertCircle** icon - warning feedback

### ✅ Help Bar
- **Lightbulb** icon - tip indicator
- **Trash2** icon - delete action hint

---

## Available Icon Categories

### Status & Feedback Icons
```javascript
import { 
  CheckCircle,      // ✓ Success (green)
  AlertCircle,      // ! Warning (orange)
  XCircle,          // ✗ Error (red)
  InfoIcon,         // ⓘ Information (blue)
  HelpCircle        // ? Help/question
} from 'lucide-react';
```

### Action Icons
```javascript
import {
  Send,             // Send/submit
  Save,             // Save/store
  Copy,             // Copy to clipboard
  Download,         // Download file
  Upload,           // Upload file
  Trash2,           // Delete
  Edit2,            // Edit
  Eye,              // View/show
  EyeOff            // Hide
} from 'lucide-react';
```

### UI Controls
```javascript
import {
  Plus,             // Add new item
  Minus,            // Remove item
  ChevronDown,      // Expand menu
  ChevronUp,        // Collapse menu
  Settings,         // Configuration
  Menu,             // Navigation menu
  X                 // Close/exit
} from 'lucide-react';
```

### Loading & Progress
```javascript
import {
  Loader,           // Loading spinner
  Spinner,          // Alternative spinner
  Clock,            // Time/waiting
  RotateCw          // Refresh/retry
} from 'lucide-react';
```

### Node Types (Recommended)
```javascript
import {
  Type,             // Text node
  Calculator,       // Math node
  Filter,           // Filter node
  Clock,            // Delay node
  Terminal,         // Logger node
  Globe,            // API node
  Brain,            // LLM node
  Database          // Data/Input node
} from 'lucide-react';
```

### Visual Indicators
```javascript
import {
  Lightbulb,        // Tip/hint
  AlertTriangle,    // Important warning
  Zap,              // Lightning/power
  Layers,           // Stacking/hierarchy
  Link2,            // Connection/relationship
  Network           // Network topology
} from 'lucide-react';
```

---

## How to Use Icons in Your Code

### Basic Usage
```jsx
import { CheckCircle, Send } from 'lucide-react';

// In your component
<CheckCircle size={20} className="text-green-500" />
<Send size={18} className="inline mr-2" />
```

### Common Size Options
```javascript
size={12}   // Small (labels, badges)
size={16}   // Small-medium (toolbar, inline)
size={18}   // Medium (buttons)
size={20}   // Medium-large (cards, panels)
size={24}   // Large (icons in headers)
size={32}   // Extra large (prominent displays)
```

### Color Classes (with Tailwind)
```jsx
className="text-green-500"     // Success (green)
className="text-red-500"       // Error (red)
className="text-amber-500"     // Warning (orange/amber)
className="text-blue-500"      // Info (blue)
className="text-gray-400"      // Secondary (gray)
```

### Styling Variations
```jsx
// Animated spinner
<Loader size={18} className="animate-spin" />

// Inline with text
<Send size={16} className="inline mr-2" />

// Standalone icon
<AlertCircle size={24} className="text-red-500" />

// With hover effect
<Edit2 size={18} className="hover:text-blue-400 cursor-pointer" />

// Custom color from config
<CheckCircle size={20} style={{ color: '#50d890' }} />
```

---

## Implementation Examples

### Example 1: Add Icon to a Node
```jsx
// In inputNode.js
import { FileInput } from 'lucide-react';

export const InputNode = ({ data }) => (
  <BaseNode>
    <div className="flex items-center gap-2">
      <FileInput size={16} />
      <span>Input</span>
    </div>
    {/* rest of node */}
  </BaseNode>
);
```

### Example 2: Add Icon to Toolbar Button
```jsx
// In toolbar.js
import { Plus, Type, Calculator } from 'lucide-react';

const nodeTypes = [
  { type: 'text', label: 'Text', Icon: Type },
  { type: 'math', label: 'Math', Icon: Calculator },
  // ...
];

{nodeTypes.map(({ type, label, Icon }) => (
  <button key={type} className="flex items-center gap-2">
    <Icon size={18} />
    {label}
  </button>
))}
```

### Example 3: Status Message with Icon
```jsx
// In your feedback component
import { AlertTriangle, XCircle } from 'lucide-react';

<div className="error-message">
  <XCircle size={20} />
  <p>Pipeline submission failed</p>
</div>
```

### Example 4: Animated Loading
```jsx
import { Loader } from 'lucide-react';

<button disabled={isLoading}>
  {isLoading && <Loader size={16} className="animate-spin inline mr-2" />}
  {isLoading ? 'Processing...' : 'Submit'}
</button>
```

---

## Current Color Scheme

From your dark theme configuration:
```css
--accent-blue: #6fa3ff
--accent-green: #50d890
--accent-orange: #ff9f53
--text-primary: #e0e0e0
--text-secondary: #b0b8c4
--error-red: #ff6b6b
```

Use these with inline styling for consistency:
```jsx
<CheckCircle size={20} style={{ color: '#50d890' }} />
<AlertCircle size={20} style={{ color: '#ff9f53' }} />
<XCircle size={20} style={{ color: '#ff6b6b' }} />
```

---

## Next Steps

1. **Add icons to node types** - Use different icons for each node type in the toolbar
2. **Add status indicators** - Show icons for node connections status
3. **Add icons to toolbar** - Include icons in the draggable node buttons
4. **Custom animations** - Combine icons with CSS animations for loading states

---

## Full Lucide Icon List

For a complete list of 400+ icons, visit:
**https://lucide.dev**

Simply import any icon and use it:
```javascript
import { IconName } from 'lucide-react';
```

Common naming patterns:
- `CheckCircle`, `XCircle`, `AlertCircle`, `InfoIcon` - status icons
- `Activity`, `Zap`, `Flame`, `Wind` - action/energy icons
- `Database`, `Server`, `Cpu`, `HardDrive` - tech icons
- `Heart`, `Star`, `Award`, `Trophy` - achievement icons
- `Music`, `Volume2`, `Camera`, `Mic` - media icons
