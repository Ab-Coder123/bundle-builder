# AI Coding & Architecture Rules (AGENTS.md)

When collaborating on or maintaining the `bundle-builder` project, strictly follow these engineering principles:

1. **Strict TypeScript Typing**:
   - Always use TypeScript with explicit return types and interfaces.
   - Never use `any`. Define custom interfaces in `src/types/`.

2. **No Duplicated Components or Logic**:
   - Re-use common UI components (`Button`, `QuantityStepper`, `Icon`, `ProductPrice`).
   - Centralize utility logic inside `src/utils/` (`price.ts`, `storage.ts`, `helpers.ts`).

3. **Global State via Redux Toolkit**:
   - Always use Redux Toolkit slices (`src/features/bundle/bundleSlice.ts`) for multi-step bundle configuration state.
   - Access and mutate state through custom hooks (`useBundle()`, `usePriceCalculator()`) and typed selectors (`useAppSelector`).

4. **Separation of Concerns**:
   - Keep business logic (price math, variant keys, storage persistence) separated from UI render components.

5. **Automated Testing Requirement**:
   - Always write Vitest + React Testing Library tests for new Redux slice reducers and UI components.
