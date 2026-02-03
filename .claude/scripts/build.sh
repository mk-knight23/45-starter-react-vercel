#!/bin/bash

# Build Script for React + Vite + Vercel Starter
# This script runs type checking, linting, and builds the project

set -e  # Exit on error

echo "🏗️  Building React + Vite + Vercel Starter..."

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running lint..."
npm run lint

# Build the project
echo "📦 Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo "📁 Output directory: dist/"
echo ""
echo "To preview the build:"
echo "  npm run preview"
echo ""
