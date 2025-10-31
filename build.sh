#!/bin/bash
set -e

echo "🔨 Installing frontend dependencies..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"

echo "🏗️ Building frontend..."
npm run build
echo "✅ Frontend built successfully"

cd ..
echo "✨ Build complete!"
