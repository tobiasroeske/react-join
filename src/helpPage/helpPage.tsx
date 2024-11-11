import PageLayout from '../shared/components/pageLayout'
import Help from './helpComponent'

function HelpPage() {
  return (
    <>
      <PageLayout onContactPage={true} Component={Help} />
    </>
  )
}

export default HelpPage
