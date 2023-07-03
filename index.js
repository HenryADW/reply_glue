const app = require('./app.js');

const PORT = 8070;

app.listen(
    PORT,
    () => console.log(`Server is running on port http://localhost:${PORT}`)
)