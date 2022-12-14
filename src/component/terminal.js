import React from 'react';
import './Socket.css';

var id = 1;

function inputfocus() {
  console.log('foucs');
  document.getElementById('command').focus();
}
function clear() {
  document.getElementById('record').innerText = 'Cleared!!!!!!!';
}
function sendcommand(event) {
  //event.keyCode==13

  console.log('sendcommand' + event);
  // console.log(event);
  console.log(event.charCode);
  if (event.charCode == 13) {
    if (event.target.value != '') {
      var t = event.target.value;
      console.log(socket);
      console.log(socket.readyState + ' ' + socket.readyState);
      if (socket.readyState === socket.readyState) {
        transmitcommand(t);
        document.getElementById('record').innerText += '>$Sent->' + t + '\n';
      } else {
        document.getElementById('record').innerText += '>$NotSent->' + t + '\n';
      }
    } else {
      document.getElementById('record').innerText += '>$error invalid >' + '\n';
    }
    event.target.value = '';

    event.target.focus();
    document.getElementById('terminal').scrollTop = event.target.offsetTop;
  }
}

function setid() {
  var e = document.getElementById('id');
  if (document.getElementById('input') == null) {
    return;
  }

  id = document.getElementById('input').value;
  e.innerText = 'Client' + id;
}

setid();
const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
  console.log('Connected to WS Server');
  document.getElementById('status').innerText = 'Live';
});
socket.addEventListener('error', function (event) {
  console.log('Connected to error');
  console.log(event);
  document.getElementById('status').innerText = 'Error';
});
socket.addEventListener('closed', function (event) {
  console.log('disConnected to WS Server');
  document.getElementById('status').innerText = 'Closed';
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);

  if (event.data instanceof Blob) {
    reader = new FileReader();

    reader.onload = () => {
      console.log('Result: ' + reader.result);
    };

    reader.readAsText(event.data);
  } else {
    console.log('Result: ' + event.data);
  }
});

const sendMessage = () => {
  socket.send('Hello From Client!' + id);
};
const transmitcommand = (msg) => {
  socket.send(msg);
};
export default function terminal() {
  return (
    <div>
      <div>
        <input id="input" type="text" />
        <button onClick={setid}>setid</button>
        <p id="id">Wait....</p>
        <p id="status">Status-:</p>
        <div id="terminal" className="terminal" onClick={inputfocus}>
          <div id="headline" className="HeadLine">
            Terminal-Tagline
          </div>
          <div id="record" className="record">
            *Welcome Message*
            <br />
          </div>
          <div className="code">
            <span>{'>$'}</span>
            <input
              onKeyPress={sendcommand}
              id="command"
              defaultValue=""
              type="text"
            ></input>
          </div>
        </div>

        <div>
          <button className="Send" onClick={sendMessage}>
            Send Msg
          </button>
          <button className="clear" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
