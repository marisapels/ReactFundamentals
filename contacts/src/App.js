import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'



class App extends Component {
state = {
  contacts: []
}

componentDidMount(){
  ContactsAPI.getAll().then((contacts) =>
  this.setState({ contacts })
)
}
//metodei removeContact nodod contact- to ko nospieda kaa parametru
removeContact = (contact) => {
  //ja update state baazeejoties uz ieprieksheejo state tad nodod funkciju
  this.setState((state) => ({
    contacts: state.contacts.filter((c) => c.id !== contact.id)
  }))

  ContactsAPI.remove(contact);
  //ja update neņemot vērā, kas iepriekš bija- nodod objektu
  //this.setState({
  //
  // })

  }
  
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>(
            <ListContacts 
              onDeleteContact={this.removeContact} 
              contacts={this.state.contacts} 
            />
        )}/>
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
