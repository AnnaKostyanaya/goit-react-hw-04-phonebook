import { useState } from "react";
import PropTypes from 'prop-types';
import style from '../ContactForm/ContactForm.module.css';

const ContactForm = ({ onSubmit, onCheck }) => {

const [name, setName] = useState("");
const [number, setNumber] = useState("");

const handleChange = event => {
const {name, value} = event.currentTarget;
switch (name) {
    case 'name':
        setName(value);
        break;

    case 'number':
        setNumber(value);
        break;
    
    default:
        return;
    }
};

const handleSubmit = event => {
    const checkName = event.currentTarget.name.value;
    event.preventDefault();
    onSubmit({ name, number });
    clearForm(checkName);
};

const clearForm = (checkName) => {
    if (onCheck(checkName)) {
        setName("");
    } else {
        setName("");
        setNumber("");
    }
}

return (
    <form onSubmit={handleSubmit} >
        <label className={style.lable} >Name
            <input className={style.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleChange}
                value={name}
            />
        </label>
        <label className={style.lable} >Number
            <input className={style.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleChange}
                value={number}
            />
        </label>
    <button className={style.btn} type="submit">Add contact</button>
    </form>
);
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
};