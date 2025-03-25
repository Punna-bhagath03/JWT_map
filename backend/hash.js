const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'password123'; // Ensure this is exact
  const hash = await bcrypt.hash(password, 10);
  console.log('New hash:', hash);
}

generateHash();
