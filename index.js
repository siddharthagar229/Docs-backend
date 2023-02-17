
import { Server } from 'socket.io';

import Connection from './database/db.js';
import cors from 'cors';
import { getDocument, updateDocument } from './controller/document-controller.js'
// const cors = require('cors');
const PORT =  9000;

Connection();
// require("socket.io")
const io =new Server (PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })
    })
});