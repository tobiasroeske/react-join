import '@testing-library/jest-dom';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useAuthContext } from "../authProvider";
import { render, screen } from "@testing-library/react";
import PageLayout from "./pageLayout";

jest.mock('../authProvider', () => ({
    useAuthContext: jest.fn(),
}));

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useLocation: jest.fn(),
    };
});

describe('PageLayout', () => {
    const MockComponent: React.ComponentType = () => <div>Mock Component</div>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('shows back to login page, if no user is logged in and not on special page', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ loading: false, user: null });
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' } as any);

        render(
            <Router>
                <PageLayout Component={MockComponent} onContactPage={false} />
            </Router>
        );
        const goBackToLogin = screen.getByText(/Please Login/i);
        expect(goBackToLogin).toBeInTheDocument();
    });


    test('shows loading spinner, if page is loading and user is logged in', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ loading: true, user: !null });
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' } as any);

        render(
            <Router>
                <PageLayout Component={MockComponent} onContactPage={false} />
            </Router>
        )
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    })

    test('shows desired component, if user is logged in and page is not loading', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ loading: false, user: !null });
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' } as any);

        render(
            <Router>
                <PageLayout Component={MockComponent} onContactPage={false} />
            </Router>
        )

        expect(screen.getByText(/Mock Component/i)).toBeInTheDocument();
    })

    test('shows right class if url path is on contact page', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ loading: false, user: !null });
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' } as any);

        render(
            <Router>
                <PageLayout Component={MockComponent} onContactPage={true} />
            </Router>
        )

        expect(screen.getByTestId('main-container')).toHaveClass('contactPageContainer');
    })
});