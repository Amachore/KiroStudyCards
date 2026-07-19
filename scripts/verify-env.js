#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 * Run this to check if your Supabase environment is configured correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Supabase Environment Configuration...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.error('❌ .env.local file not found!');
  console.log('\n📝 Create a .env.local file with:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key\n');
  process.exit(1);
}

console.log('✅ .env.local file found');

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  
  const [key, ...valueParts] = trimmed.split('=');
  const value = valueParts.join('=').trim();
  envVars[key.trim()] = value;
});

// Check required variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let allValid = true;

requiredVars.forEach(varName => {
  const value = envVars[varName];
  
  if (!value || value === 'your_supabase_url' || value === 'your_supabase_anon_key' || value === 'your_anon_key_here' || value === 'your_supabase_url_here') {
    console.error(`❌ ${varName} is not set or has placeholder value`);
    allValid = false;
  } else if (value.includes(' ')) {
    console.error(`❌ ${varName} contains spaces - remove spaces after = sign`);
    allValid = false;
  } else {
    console.log(`✅ ${varName} is set`);
    
    // Additional validation
    if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
      if (!value.startsWith('https://')) {
        console.warn(`⚠️  ${varName} should start with https://`);
      }
      if (!value.includes('.supabase.co')) {
        console.warn(`⚠️  ${varName} should be a Supabase URL`);
      }
    }
    
    if (varName === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
      if (value.length < 100) {
        console.warn(`⚠️  ${varName} seems too short - should be a JWT token`);
      }
    }
  }
});

console.log('\n' + '='.repeat(50));

if (allValid) {
  console.log('\n✅ All environment variables are configured correctly!');
  console.log('\n🚀 You can now run: npm run dev');
  console.log('📦 Or deploy to Vercel\n');
  process.exit(0);
} else {
  console.log('\n❌ Some environment variables are missing or incorrect');
  console.log('\n📚 Check DEPLOYMENT.md for detailed setup instructions');
  console.log('🔗 Get your keys from: https://app.supabase.com/project/_/settings/api\n');
  process.exit(1);
}
