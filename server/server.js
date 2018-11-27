const express = require('express');
const path = require('path');

let app = express();
let publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));




app.listen(port, () => {
	console.log(`Listen port ${port}`);
})