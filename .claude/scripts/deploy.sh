#!/bin/bash

# Deploy Script for React + Vite + Vercel Starter
# This script builds and prepares the project for deployment

set -e  # Exit on error

echo "🚀 Deploying React + Vite + Vercel Starter..."

# Run the build script
echo "🏗️  Building project..."
bash .claude/scripts/build.sh

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Preview the build
echo "👀 Previewing build..."
echo "Starting preview server at http://localhost:4173"
echo "Press Ctrl+C to stop the preview"
echo ""

npm run preview

echo ""
echo "✅ Deployment ready!"
echo ""
echo "To deploy to Vercel:"
echo "  vercel --prod"
echo ""
echo "To deploy to Netlify:"
echo "  netlify deploy --prod"
echo ""
