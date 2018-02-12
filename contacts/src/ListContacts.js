import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



class ListContacts extends Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = (query) => {
        this.setState({ query: ''})
    }

    render () {
        //uztaisam konstantes , lai var this.props.contacts vietaa rakstiit contacts,
        //taapat arii this.props.onDeleteContact vietaa onDeleteContact
        //taapat arii this.state.query vietaa query
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state 
        

        let showingContacts
        if (this.state.query){
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        }else{
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (   
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts' 
                        type='texts' 
                        placeholder='Search contacts' 
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <a 
                        href="#create"
                        onClick={this.props.onNavigate}
                        className="add-contact"
                    >Add Contact</a>
                </div>

            {showingContacts.length != contacts.length && (
                <div class='showing-contacts'>
                    <span>Now showing {showingContacts.length} of {contacts.length} contacts</span>
                    <button onClick={this.clearQuery}>Show all</button>
                </div>
            )}

            <ol className='contact-list'>
                {showingContacts.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }}/>
                    
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>

                        <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                            Remove
                        </button>

                    </li>
                ))
                }
            </ol>
            </div>
        )
        
    }
}


export default ListContacts