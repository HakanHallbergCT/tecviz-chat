import React, { Component } from 'react'
import './TextBar.css'

export default class TextBar extends Component {
  constructor (props) {
    super(props)
    this.input = React.createRef()
    window.textbar = this;
  };

  sendMessage () {
    this.props.onSend && this.props.onSend(this.input.current.value)
    this.input.current.value = ''
  };
  
  sendMessageIfEnter (e) {
    if (e.keyCode === 13) {
      this.sendMessage()
    };
  };

   startTestHandler (id) {
     //sends autogenerated messages.
     var _interval;
     if(!_interval) {
      _interval = setInterval(() => {
        //this.sendMessage()
        document.getElementById('TestButton').click();
      }, 5000);   
      return clearInterval();
    }
  }

  render () {
    const sendMessage = this.sendMessage.bind(this)
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)
    
    return (
      <div className='textbar'>
        <input className='textbar-input' 
               type='text' 
               ref={this.input} 
               onKeyDown={sendMessageIfEnter} />
        <button className='textbar-send' id="TestButton"
                onClick={sendMessage} >
          Send
        </button>
      </div>
    )
  }
}