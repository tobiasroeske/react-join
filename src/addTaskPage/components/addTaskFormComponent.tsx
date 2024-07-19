import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '../addTaskPage.module.css';
import { Contact } from '../../shared/interfaces/contact.interface';
import AddContactSelect from './addContactSelectComponent';
import PrioButton from './prioButtonComponent';
import SelectCategory from './selectCategoryComponent';

type FormFields = {
    title: string,
    description: string,
    assignedContacts: Contact[],
    dueDate: number,
    category: string,
    subtask: string[]
}

function AddTaskForm() {
    const { register, formState: { errors } } = useForm<FormFields>();
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [priority, setPriority] = useState<string>('Medium');
    const [category, setCategory] = useState<string>('');

    const handleContactSelect = (selectedContact: Contact) => {
        let newSelectedContacts: Contact[] = [...selectedContacts];
        let contactIndex = newSelectedContacts.findIndex(contact => contact.id === selectedContact.id);
        if (contactIndex === -1) {
            newSelectedContacts.push(selectedContact);
        } else {
            newSelectedContacts.splice(contactIndex, 1);
        }
        setSelectedContacts(newSelectedContacts);
    };

    function selectPriority(prio: string) {
        setPriority(prio);
    }

    function handleCategorySelect(category: string) {
        setCategory(category);
    }

    let today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        console.log(selectedContacts);
        console.log(priority);
        console.log(category)
    }, [selectedContacts, priority, category]);

    return (
        <form className={styles.form}>
            <div className={styles.formFields}>
                <div className={styles.leftside}>
                    <div className="inputContainer">
                        <label htmlFor="title" className={styles.label}>Title<span className={styles.required}>*</span></label>
                        <input {...register('title', {
                            required: "Title is required",
                            minLength: { value: 3, message: "Please enter at least 3 characters" }
                        })} type="text" id="title" name='title' placeholder='Enter a title' />
                        {errors.title && <span className='error-message'>{errors.title.message}</span>}
                    </div>

                    <div className='inputContainer'>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea {...register('description')} name="description" id="description" placeholder='Enter a description'></textarea>
                    </div>

                    <AddContactSelect
                        selectedContacts={selectedContacts}
                        handleContactSelect={handleContactSelect}
                    />
                </div>
                <div className={styles.seperator}></div>

                <div className={styles.rightside}>
                    <div className="inputContainer">
                        <label htmlFor="dueDate" className={styles.label}>Due date<span className={styles.required}>*</span></label>
                        <input {...register('dueDate', {
                            required: "Due date is required",
                        })}
                            type="date"
                            id="dueDate"
                            name='dueDate'
                            min={today}
                        />
                        {errors.dueDate && <span className='error-message'>{errors.dueDate.message}</span>}
                    </div>

                    <div className={styles.prioBtnContainer}>
                        <PrioButton
                            imgPath={'/assets/icons/prio_high.svg'}
                            text={'Urgent'}
                            isSelected={priority === 'Urgent'}
                            classOnSelect={'selectedHigh'}
                            onSelect={selectPriority}
                        />
                        <PrioButton
                            imgPath={'/assets/icons/prio_medium.svg'}
                            text={'Medium'}
                            isSelected={priority === 'Medium'}
                            classOnSelect={'selectedMedium'}
                            onSelect={selectPriority}
                        />
                        <PrioButton
                            imgPath={'/assets/icons/prio_low.svg'}
                            text={'Low'}
                            isSelected={priority === 'Low'}
                            classOnSelect={'selectedLow'}
                            onSelect={selectPriority}
                        />
                    </div>

                    <SelectCategory selectedCategory={category} onCategorySelect={handleCategorySelect} />
                </div>
            </div>
            <div className={styles.actionField}>
                <div className={styles.requiredContainer}><span className={styles.required}>*</span>This field is required</div>
                <div className={styles.actionBtnField}>
                    <div className={styles.clearBtn}>Clear <img src="/assets/icons/cancel_contacts.svg" alt="" /></div>
                    <button type='submit' className={styles.submitBtn}>Create Task <img src="/assets/icons/check_contacts.png" alt="" /></button>
                </div>
            </div>

        </form>
    );
}

export default AddTaskForm;
