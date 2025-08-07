const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

// Generate self-signed certificate
const attrs = [{ name: 'commonName', value: '86.122.74.26' }];
const pems = selfsigned.generate(attrs, { days: 365 });

// Save the certificate and key
fs.writeFileSync(path.join(__dirname, 'cert.pem'), pems.cert);
fs.writeFileSync(path.join(__dirname, 'key.pem'), pems.private);

console.log('Self-signed certificate generated successfully!');
