import React from 'react';

export default function Socket() {
  return (
    <div>
      <h3>Socket-UI</h3>
      <div>
        <input id="input" type="text" />
        <button onclick="setid()">setid</button>
        <p id="id">Wait....</p>
        <div id="terminal" class="terminal" onclick="inputfocus()">
          <div id="headline" class="HeadLine">
            Terminal-Tagline
          </div>
          <div id="record" class="record">
            *Welcome Message*
          </div>
          <div class="code">
            <span>{'>'}</span>
            <input
              onkeypress="sendcommand(event)"
              id="command"
              value=""
              type="text"
            ></input>
          </div>
        </div>
        <button onclick="sendMessage()">Send Msg</button>
      </div>
    </div>
  );
}
