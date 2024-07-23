import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../addTaskPage.module.css';
import { Contact } from '../../shared/interfaces/contact.interface';
import AddContactSelect from './addContactSelectComponent';
import PrioButton from './prioButtonComponent';
import SelectCategory from './selectCategoryComponent';
import AddSubtask from './addSubtaskComponent';

type FormFields = {
    title: string;
    description: string;
    dueDate: number;
}

function AddTaskForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [priority, setPriority] = useState<string>('Medium');
    const [category, setCategory] = useState<string>('');
    const [subtasks, setSubtasks] = useState<string[]>([]);

    function handleContactSelect(selectedContact: Contact) {
        setSelectedContacts(prevContacts => {
            const contactIndex = prevContacts.findIndex(contact => contact.id === selectedContact.id);
            return contactIndex === -1
                ? [...prevContacts, selectedContact]
                : prevContacts.filter(contact => contact.id !== selectedContact.id);
        });
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log('Form Data:', data);
        console.log('Selected Contacts:', selectedContacts);
        console.log('Priority:', priority);
        console.log('Category:', category);
        console.log('Subtasks:', subtasks);
    };

    function selectPriority(prio: string) {
        setPriority(prio);
    }

    function handleCategorySelect(category: string) {
        setCategory(category);
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formFields}>
                <div className={styles.leftside}>
                    <div className="inputContainer">
                        <label htmlFor="title" className={styles.label}>Title<span className={styles.required}>*</span></label>
                        <input
                            {...register('title', {
                                required: "Title is required",
                                minLength: { value: 3, message: "Please enter at least 3 characters" }
                            })}
                            type="text"
                            id="title"
                            name='title'
                            placeholder='Enter a title'
                        />
                        {errors.title && <span className='error-message'>{errors.title.message}</span>}
                    </div>

                    <div className='inputContainer'>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea
                            {...register('description')}
                            name="description"
                            id="description"
                            placeholder='Enter a description'
                        ></textarea>
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
                        <input
                            {...register('dueDate', {
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

                    <SelectCategory
                        selectedCategory={category}
                        onCategorySelect={handleCategorySelect}
                    />
                    <AddSubtask subtasks={subtasks} setSubtasks={setSubtasks} />
                </div>
            </div>
            <div className={styles.actionField}>
                <div className={styles.requiredContainer}>
                    <span className={styles.required}>*</span>This field is required
                </div>
                <div className={styles.actionBtnField}>
                    <div className={styles.clearBtn}>
                        Clear <img src="/assets/icons/cancel_contacts.svg" alt="Clear" />
                    </div>
                    <button type='submit' className={styles.submitBtn}>
                        Create Task <img src="/assets/icons/check_contacts.png" alt="Submit" />
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddTaskForm;
