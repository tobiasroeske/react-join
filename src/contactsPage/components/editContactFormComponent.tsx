import { useEffect, useState } from "react";
import { Contact } from "../../shared/interfaces/contact.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from '../contactsPage.module.css';
import { useFirestoreContext } from "../../shared/firestoreProvider";


type EditContactFormProps = {
    selectedContact: Contact | null,
    onShowPopup: () => void,
    onContactEdit: (contact: Contact | null) => void
}

type FormFields = {
    name: string,
    email: string,
    phone: string,
}

function EditContactForm({selectedContact, onShowPopup, onContactEdit} :EditContactFormProps) {
    const { editContact, deleteContact } =useFirestoreContext()
    const [contact, setContact] = useState<Contact | null>(null)
    const [contactName, setName] = useState<string>('')
    const [contactEmail, setEmail] = useState<string>('');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormFields>();
    const [phoneValue, setPhoneValue] = useState<string>('');

    useEffect(() => {
        if (selectedContact) {
            setContact(selectedContact);
            setValue('name', selectedContact.name);
            setValue('email', selectedContact.email);
            setValue('phone', selectedContact.phone);
            setPhoneValue(selectedContact.phone); 
        }
    }, [selectedContact, setValue]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (contact) {
            let editedContact = {
                name: contactName, 
                email: contactEmail, 
                phone: phoneValue, 
                creatorId: contact.creatorId, 
                color: contact.color,
                id: contact.id,
            }
            await editContact({...editedContact as Contact});
            onContactEdit(editedContact as Contact);
            onShowPopup();
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'nameInput') {
            let { value } = e.target;
            setName(value);
        }
        if (e.target.id === 'emailInput') {
            let { value } = e.target;
            setEmail(value);
        }
        if (e.target.id === 'phoneInput') {
            let { value } = e.target
            value = value.replace(/[^0-9+]/g, '');
            setPhoneValue(value);
        }
    };

    async function handleDelete() {
        if (contact) {
            await deleteContact(contact.id);
            onContactEdit(null)
            onShowPopup();
        }
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addContactForm}>
            <div  className="inputContainer">
                <label htmlFor="nameInput" />
                <input {...register('name', {
                    required: "Name is required",
                    minLength: { value: 3, message: "Please enter at least 3 characters" }
                })} type="text" id="nameInput" name='name' placeholder='Name' onChange={handleInputChange} />
                <img src="/assets/icons/person.png" alt="" />
                {errors.name && <span className='error-message'>{errors.name.message}</span>}
            </div>

            <div className="inputContainer">
                <label htmlFor="emailInput" />
                <input {...register('email', {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Please enter a valid email address',
                    },
                })} type="email" id="emailInput" name='email' placeholder='Email' onChange={handleInputChange}/>
                <img src="/assets/icons/mail.png" alt="" />
                {errors.email && <span className='error-message'>{errors.email.message}</span>}
                {errors.root && <span className='error-message'>{errors.root.message}</span>}
            </div>

            <div className="inputContainer">
                <label htmlFor="phoneInput" />
                <input {...register('phone', {
                    required: "Phone is required",
                    minLength: { value: 5, message: "Please enter at least 5 characters" },
                    pattern: {
                        value: /^[0-9+]*$/,
                        message: "Only numbers and the plus sign are allowed"
                    }
                })} type="text" id="phoneInput" name='phone'  placeholder='Phone' onChange={handleInputChange} value={phoneValue} />
                <img src="/assets/icons/call.png" alt="" />
                {errors.name && <span className='error-message'>{errors.name.message}</span>}
            </div>

            <div className={styles.formAction}>
                <div className={styles.deleteBtn} onClick={handleDelete}>Delete</div>
                <button type="submit" className={styles.submitBtn}>Save <img src="/assets/icons/check_contacts.png" alt="" /></button>
            </div>
        </form>
     );
}

export default EditContactForm;