#!/bin/bash

# Setup Script for React + Vite + Vercel Starter
# This script sets up the development environment

set -e  # Exit on error

echo "🚀 Setting up React + Vite + Vercel Starter..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        echo "📝 Creating .env.local from .env.example..."
        cp .env.example .env.local
        echo "⚠️  Please update .env.local with your actual values"
    fi
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run build to verify everything works
echo "🏗️  Building project..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your environment variables"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
