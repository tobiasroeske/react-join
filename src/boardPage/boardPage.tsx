import '../index.css'
import PageLayout from '../shared/components/pageLayout'
import Board from './components/boardComponent'

function BoardPage() {
  return <PageLayout Component={Board} onContactPage={false} />
}

export default BoardPage
