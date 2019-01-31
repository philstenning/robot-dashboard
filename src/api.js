import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.55.11:5001');

function sendData() {
    socket.emit('data', { it: 'worked' });
}
function sendMovementControl(speed, direction) {
    const payload = JSON.stringify({ speed, direction });
    socket.emit('movement-control', payload);
}

function subscribeToProximitySensor(cb) {
    socket.on('proximity', data => {
        console.log(data);
        cb(null, data);
    });
}
function subscribeToMovementControl(cb) {
    socket.on('movement-control', data => {
        console.log(data);
        const d = JSON.parse(data);
        cb(null, d);
    });
}
function subscribeToInfo(cb) {
    socket.on('info', data => {
        cb(null, data);
    });
}

export {
    sendData,
    subscribeToProximitySensor,
    subscribeToMovementControl,
    sendMovementControl,
    subscribeToInfo
};
