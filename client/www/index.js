'use strict';
const app = require('./app');
const PORT = process.env.PORT || 8801;
console.log('client start')
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});