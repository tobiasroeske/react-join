import '../index.css'
import PageLayout from '../shared/components/pageLayout'
import AddTask from './components/addTaskComponent'

function AddTaskPage() {
  return <PageLayout Component={AddTask} onContactPage={false} />
}

export default AddTaskPage
