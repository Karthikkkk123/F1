@echo off
echo Fixing Next.js Dependencies...
echo.

echo Step 1: Removing node_modules and package-lock.json...
if exist node_modules (
    rmdir /s /q node_modules
    echo node_modules removed.
)
if exist package-lock.json (
    del package-lock.json
    echo package-lock.json removed.
)

echo.
echo Step 2: Clearing npm cache...
call npm cache clean --force

echo.
echo Step 3: Installing dependencies...
call npm install

echo.
echo Step 4: Starting development server...
call npm run dev
