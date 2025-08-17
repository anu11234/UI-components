const { execSync } = require('child_process');
try {
  const version = execSync('npx tailwindcss --version').toString();
  console.log(`Tailwind CSS version: ${version}`);
} catch (error) {
  console.error('Error checking Tailwind version:', error.message);
}