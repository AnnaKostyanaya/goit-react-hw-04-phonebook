import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import style from '../App/App.module.css';


const LS_KEY = 'reader_contacts_data';
const App = () => {
  const [contacts, setContacts] = useState(() => {
      const savedState = localStorage.getItem(LS_KEY);
      return savedState ? JSON.parse(savedState) : defaultContacts;
    });
  const [filter, setFilter] = useState("");

  const defaultContacts = [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]


useEffect(() => {
  localStorage.setItem(LS_KEY, JSON.stringify(contacts));
}, [contacts]);


const formSubmitHandler = ({name, number}) => {
  if (checkName(name)) {
    alert(`${name} is already in contacts`);
  } else { 
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [newContact, ...prevState]);
  }
}

const checkName = (name) => {
  const normalizeName = name.toLowerCase();
  const checkname = contacts.filter(contact =>
    contact.name.toLowerCase() === normalizeName
  );
  if (checkname.length !== 0) {
    return true;
  } else {
    return false;
  }
}

const deleteContact = nameId => {
  setContacts(prevState => prevState.filter(contact => contact.id !== nameId));
};

const changeFilter = event => {
  setFilter(event.currentTarget.value);
};

const getVisibleContacts = () => {
  const lowerCaseFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(lowerCaseFilter),
  );
};

const visibleContacts = getVisibleContacts();

return (
  <div className={style.container}>
    <h1 className={style.main_title}>Phonebook</h1>
    <ContactForm onSubmit={formSubmitHandler} onCheck={checkName}/>
        
    <h2 className={style.title}>Contacts</h2>
    <Filter value={filter} onChange={changeFilter} />
    <ContactList contacts={visibleContacts} onDeleteContact={deleteContact}/>
  </div>
);

}

export default App;