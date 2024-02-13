import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const URL ='https://budget-planner-backend-55c68a159767.herokuapp.com/ws';

export const getStompClient = () => {
    const socket = new SockJS(URL);
    return Stomp.over(socket);
};