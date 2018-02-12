import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'



class App extends Component {
state = {
  screen: 'list', //  list, create
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
  
  render() {
    return (
      <div className="app">
        {this.state.screen === 'list' && (
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts} 
            onNavigate={() => {
              this.setState({ screen: 'create'})
            }}
          />
        )}
        
        {this.state.screen === 'create' && (
        <CreateContact/>
        )}
      </div>
    )
  }
}

export default App;
