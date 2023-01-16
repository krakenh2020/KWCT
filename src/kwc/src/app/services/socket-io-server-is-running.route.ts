


export function socketIoServerIsRunning(req, res) {

    const sub = req.body;

    console.log('Received socket.io service is running request: ', sub);
    
    res.status(200).json({message: 'socket.io server: I am running'});
}

