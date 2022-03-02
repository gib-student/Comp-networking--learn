import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
})
