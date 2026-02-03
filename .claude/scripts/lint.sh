#!/bin/bash

# Lint Script for React + Vite + Vercel Starter
# This script runs ESLint and auto-fixes issues

set -e  # Exit on error

echo "🧹 Linting React + Vite + Vercel Starter..."

# Run ESLint with auto-fix
echo "🔍 Running ESLint with auto-fix..."
npx eslint . --fix

echo ""
echo "✅ Linting complete!"
echo ""
echo "To run lint without auto-fix:"
echo "  npm run lint"
echo ""
