#!/bin/bash

# 1. Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# 2. Push schema to database (if using development)
echo "Pushing schema to database..."
npx prisma db push

# 3. Optional: Open Prisma Studio to verify
echo "Setup complete! You can run 'npx prisma studio' to view your database."
