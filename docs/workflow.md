# Application Workflow & Architecture

This document explains the user journey, component communication, and Redux Toolkit data flow for the Bundle Builder application.

---

## 1. User Journey

```mermaid
graph TD
    A[User visits Bundle Builder] -->|Auto-load| B[Restore from LocalStorage]
    B --> C[Step 1: Choose Cameras]
    C --> D[Select Variants & Quantities]
    D --> E[Live Review Panel Updates Instantly]
    E --> F[Step 2: Choose Plan]
    F --> G[Step 3: Choose Sensors]
    G --> H[Step 4: Add Extra Protection]
    H --> I[Review Total Price & Savings]
    I --> J[Save System for Later or Checkout]
```

1. **Initialization**: On application startup, `useLocalStorageRestore` dispatches `restoreBundle()`, checking LocalStorage key `bundle_configuration`. If found, previously selected bundle items are automatically restored into Redux state.
2. **Step Navigation**: Users navigate through 4 collapsible accordion steps (`BundleSteps` -> `StepAccordion`). Clicking a step header expands its product grid while collapsing others.
3. **Product Configuration**: Each `ProductCard` allows users to select color/billing variants (`ProductVariantSelector`) and increment/decrement quantities (`QuantityStepper`).
4. **Real-Time Live Review**: Any change dispatches a Redux action (`addProduct` / `updateQuantity` / `changeVariant`). The `ReviewPanel` automatically recalculates subtotals, bundle discounts, shipping eligibility, and monthly financing.
5. **Persistence & Checkout**: Users can click "Save my system for later" to persist their configuration to LocalStorage, or "Proceed to Secure Checkout".

---

## 2. Redux Toolkit Architecture & Data Flow

```mermaid
sequenceDiagram
    participant UI as ProductCard / ReviewItem
    participant Action as Redux Action Creator
    participant Store as Redux Store (bundleSlice)
    participant Storage as LocalStorage helper

    UI->>Action: addProduct / updateQuantity / changeVariant
    Action->>Store: Dispatch PayloadAction
    Store->>Store: Update selectedItems (by unique composite key)
    Store-->>UI: Selectors trigger re-render with updated subtotal & savings
    UI->>Action: saveBundle()
    Action->>Store: Set saved = true
    Store->>Storage: saveBundleToStorage(state)
```

### Key Technical Decision: Composite Key Isolation
Each selected product line item uses a composite key:
`key = ${productId}_${variantId || 'default'}`
This prevents variants of the same product (e.g. Black Camera vs White Camera) from overwriting each other when quantities change.
