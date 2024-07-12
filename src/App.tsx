import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './loginPage/loginPage';
import SummaryPage from './summaryPage/summaryPage';
import BoardPage from './boardPage/boardPage';
import AddTaskPage from './addTaskPage/addTaskPagae';
import ContactsPage from './contactsPage/contactsPage';
import RegisterPage from './registerPage/registerPage';
import ErrorPage from './errorPage/errorPage';
import AuthProvider from './shared/authProvider';
import FirestoreProvider from './shared/firestoreProvider';
import LegalNotice from './legalNoticePage/legalNoticePage';
import PrivacyPolicy from './privacyPolicyPage/privacyPolicyPage';


function App() {
  const router = createBrowserRouter([
    { path: '/', element: <SummaryPage />, errorElement: <ErrorPage /> },
    { path: '/summary', element: <SummaryPage /> },
    { path: '/board', element: <BoardPage /> },
    { path: 'add-task', element: <AddTaskPage /> },
    { path: 'contacts', element: <ContactsPage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
    { path: 'legal-notice', element: <LegalNotice /> },
    { path: 'privacy-policy', element: <PrivacyPolicy /> }
  ]);

  return (
      <AuthProvider>
        <FirestoreProvider>
          <RouterProvider router={router} />
        </FirestoreProvider>
      </AuthProvider>
  );
}

export default App;
