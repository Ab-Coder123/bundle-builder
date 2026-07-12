# Senior Engineering Report: Technical Decisions & Architecture

## 1. Executive Summary
The **Bundle Builder Application** was built from the ground up to deliver a production-grade custom security system configuration experience inspired by the Wyze x Coldbru design specification. The application combines **React 19, TypeScript, Vite, Redux Toolkit, and Tailwind CSS** with automated testing via **Vitest**.

---

## 2. Completed Features
- ✅ **4-Step Accordion Flow**: Cameras -> Plan -> Sensors -> Extra Protection with clear step counters and badge status indicators.
- ✅ **Variant Isolation Logic**: Selecting multiple quantities across different variants of the same product (e.g. Black vs. White Camera) preserves separate line items accurately.
- ✅ **Live Review Panel**: Sticky sidebar updating automatically with category grouped breakdowns, real-time discount savings calculation, shipping guarantees, and financing estimates.
- ✅ **LocalStorage Persistence**: One-click "Save my system for later" with automatic restore on startup and toast notification feedback.
- ✅ **Automated Testing**: Complete Vitest unit and component test coverage for state management and UI interactions.

---

## 3. Key Technical Decisions & Tradeoffs

### A. Composite Key Line Item Structure
Rather than storing `selectedItems` purely by `productId`, each line item uses `${productId}_${variantId || 'default'}`.
- **Tradeoff**: Slightly more complex lookup logic when updating quantities.
- **Benefit**: Ensures clean isolation between different variants without losing user state when switching variant selectors.

### B. Custom Hooks Layer (`useBundle` & `usePriceCalculator`)
We wrapped all raw `useAppDispatch` and `useAppSelector` calls inside dedicated custom hooks.
- **Benefit**: Keeps UI components decoupled from internal Redux slice structures and simplifies testing.

---

## 4. Future Roadmap & Scalability
- **Backend API Integration**: Replace `products.json` static import with RTK Query endpoints (`createApi`) for dynamic pricing and stock levels.
- **URL Query Sync**: Sync active bundle state to URL parameters (`?bundle=cam-4k-outdoor:black:2`) for easy social sharing.
