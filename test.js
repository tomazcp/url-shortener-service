const dns = require('dns');

const url1 = 'https://fcc-url-shortener-service.onrender.com/?v=1672061943058';
const url2 = 'fcc-url-shortener-service.onrender.com';

// dns.lookup(url1, (err, addresses, family) => {
//   if (err) {
//     return console.log(`url 1 : ${err}`);
//   }

//   console.log(`url 1:  ${addresses}`);
// });

// dns.lookup(url2, (err, addresses, family) => {
//   if (err) {
//     return console.log(`url 2: ${err}`);
//   }

//   console.log(`url 2:  ${addresses}`);
// });

const regex = /[^https?:\/\/](.*)\.[a-z]+/gi;

console.log(url1.match(regex)[0]);
