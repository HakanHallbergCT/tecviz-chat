import React from 'react';
import './App.css';

import MessageWindow from './MessageWindow/MessageWindow';
import TextBar from './TextBar/TextBar';
import { send, registerOnMessageCallback } from './websocket';

class App extends React.Component {
  state = {
    messages: [],
    username: null,
  }
  
  constructor (props) {
    super(props)
    registerOnMessageCallback(this.onMessageReceived.bind(this))
    window.username = '';
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg)
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  setUserName (name) {
    this.setState({
      username: name
    })
  }

  sendMessage (text) {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = hours + ':' + minutes;
    //const testText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const message = {
      time: time,
      username: this.state.username  || window.username,
   //  text: testText  //For generating random test strings
      text: text
    }
  
    send(JSON.stringify(message));
   
  };

  render () {
    const setUserName = this.setUserName.bind(this);
    const sendMessage = this.sendMessage.bind(this);

    if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter username</div>
          <TextBar onSend={setUserName} />
        </div>
      );
    };
    return (
      <div className='container'>
        <div className='container-title'>TecViz Chat</div>
        <MessageWindow messages={this.state.messages} username={this.state.username} />
        <TextBar onSend={sendMessage} />
      </div>
    );
  };
};

export default App