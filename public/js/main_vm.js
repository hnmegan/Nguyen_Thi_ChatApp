// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
const socket = io();

function setUserID({sID}) {
    //debugger;
    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    vm.messages.push(msg);
}

const vm = new Vue({
    data: {
        socketID: "",
        messages:[],
        message: "",
        nickName: ""
        
    },
    methods: {
        dispatchMessage() {
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anonymous"
            })

            this.message = "";
        }
        
    },

    components: {
        newmessage: ChatMessage
    },
    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");



//some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserID);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);