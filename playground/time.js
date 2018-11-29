const moment = require('moment');

let date = moment();
date.add(-1, 'year').subtract(9,'month');
console.log(date.format('DD-MM-YYYY HH:mm:ss'));

let createdAt = new Date().getTime();
let newDate = moment(createdAt);
console.log(newDate.format('DD-MM-YYYY HH:mm:ss'));

let newNewDate = moment().valueOf();
console.log(newNewDate);