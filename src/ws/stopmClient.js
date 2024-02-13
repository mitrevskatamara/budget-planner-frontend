import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const URL ='http://localhost:8081/ws';

export const getStompClient = () => {
    const socket = new SockJS(URL);
    return Stomp.over(socket);
};