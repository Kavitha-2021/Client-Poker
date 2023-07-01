import {io} from 'socket.io-client'

const URL = 'http://192.168.5.20:8080'
// const URL = 'ws://192.168.5.20:6060'

export const socket = io(URL, {
    transports: ["websocket"],
    extraHeaders: {
      myheader: "12345",
    },
    withCredentials: true,
    autoConnect: false,
});


