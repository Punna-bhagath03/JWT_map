const bcrypt = require('bcryptjs');

async function verifyHash() {
  const password = 'password123';
  const hash = '$2b$10$KZdfxCxdLuesvSDb2gKmf.APmtd4BEODVn5bg.wuqTABdrFsBZfE';
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Password matches hash:', isMatch);
}

verifyHash();
