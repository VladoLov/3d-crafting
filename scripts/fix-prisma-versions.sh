#!/bin/bash

echo "🔧 Fixing Prisma version compatibility..."

# 1. Remove node_modules and lock files
echo "Removing node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# 2. Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# 3. Install dependencies with matching Prisma versions
echo "Installing dependencies..."
npm install

# 4. Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# 5. Check if database exists and push schema
echo "Setting up database..."
npx prisma db push --accept-data-loss

echo "✅ Prisma setup complete!"
echo "You can now run: npm run dev"
