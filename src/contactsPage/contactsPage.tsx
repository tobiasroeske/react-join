import '../index.css'
import PageLayout from '../shared/components/pageLayout'
import Contacts from './components/contactsComponent'

function ContactsPage() {
  return (
    <>
      <PageLayout onContactPage={true} Component={Contacts} />
    </>
  )
}

export default ContactsPage
