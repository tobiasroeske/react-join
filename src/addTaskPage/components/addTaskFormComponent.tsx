import { useForm } from 'react-hook-form';
import styles from '../addTaskPage.module.css'
import { Contact } from '../../shared/interfaces/contact.interface';
import AddContactSelect from './addContactSelectComponent';

type FormFields = {
    title: string,
    description: string,
    assignedContacts: Contact[],
    dueDate: number,
    category: string,
    subtask: string[]
}

function AddTaskForm() {
    const { register, formState: { errors } } = useForm<FormFields>()

    return (
        <form>
            <div className={styles.formFields}>
                <div className={styles.leftside}>
                    <div className="inputContainer">
                        <label htmlFor="title"><span>*</span>Title</label>
                        <input {...register('title', {
                            required: "Title is required",
                            minLength: { value: 3, message: "Please enter at least 3 characters" }
                        })} type="text" id="title" name='title' placeholder='Enter a title' />
                        {errors.title && <span className='error-message'>{errors.title.message}</span>}
                    </div>

                    <div className='inputContainer'>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" placeholder='Enter a description'></textarea>
                    </div>

                    <AddContactSelect/>
                </div>
                <div className={styles.seperator}></div>
                <div className={styles.rightside}></div>
            </div>
            <div className={styles.formActions}>
                <div><span>*</span>This field is required</div>
            </div>
            <div className={styles.actionBtnField}>
                <div className={styles.clearBtn}>Clear <img src="/assets/icons/cancel_contacts.svg" alt="" /></div>
                <button type='submit' className={styles.submitBtn}>Create Task <img src="/assets/icons/check_contacts.png" alt="" /></button>
            </div>

        </form>
    );
}

export default AddTaskForm;