#!/bin/bash

echo "🔄 Updating database schema..."

# 1. Generate new Prisma client
echo "Generating Prisma client..."
npx prisma generate

# 2. Push schema changes to database
echo "Pushing schema changes..."
npx prisma db push

echo "✅ Database updated successfully!"
echo "You can now restart your development server."
