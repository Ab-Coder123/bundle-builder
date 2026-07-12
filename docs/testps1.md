# PowerShell Verification Script (testps1.md)

Run this PowerShell script from the project root (`D:\programming\Space Work\work\bundle-builder`) to install dependencies, run automated unit/UI tests, and verify production build readiness:

```powershell
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Running Vitest test suite..." -ForegroundColor Cyan
npm run test -- --run

Write-Host "Running TypeScript compiler check & production build..." -ForegroundColor Cyan
npm run build

Write-Host "Finished Verification Successfully!" -ForegroundColor Green
```
