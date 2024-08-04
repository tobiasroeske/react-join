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
import useOrientation from './shared/hooks/useOrientation';


function App() {
  const { isPortrait } = useOrientation();

  const isMobile = window.innerWidth < 950;

  // if (!isPortrait && isMobile) {
  //   return (
  //     <div className="warning">
  //       <h1>This app works better in portrait mode</h1>
  //     </div>
  //   );
  // }

  const router = createBrowserRouter([
    { path: '/', element: <LoginPage />, errorElement: <ErrorPage /> },
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
    <FirestoreProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
