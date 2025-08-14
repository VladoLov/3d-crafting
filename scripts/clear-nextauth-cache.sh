#!/bin/bash

echo "Clearing NextAuth cache and rebuilding..."

# Clear Next.js cache
rm C:\Users\lovri\Documents\Web Development\Klienti\3d crafting\vexum\.next

# Clear node_modules cache (optional)
# rm -rf node_modules/.cache

# Reinstall dependencies to ensure clean state
#pnpm install

# Generate Prisma client
#pnpm prisma generate

echo "Cache cleared! Now run 'pnpm run dev' to start the development server."
