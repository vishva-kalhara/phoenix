import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import LandingPage from "./pages/landing/landing-page";
import Footer from "./components/footer";
import MyAppsPage from "./pages/portal/my-apps-page";
import AppConfig from "./pages/portal/app/app-config";
import NewAppPage from "./pages/portal/new-app-page";
import ApplicationLayout from "./pages/portal/app/application-layout";
import SignInPage from "./pages/auth/sign-in-page";
import NotFoundPage from "./pages/not-found-page";
import SubscriptionSuccessPage from "./pages/subscriptions/subscription-success-page";
import SubscriptionFailPage from "./pages/subscriptions/subscription-fail-page";
import WaitlistPage from "./pages/waitlist/waitlist";
import AppDocs from "./pages/portal/app/app-docs";
import WaitlistSuccess from "./pages/waitlist/watilist-success";
import VerifyUserPage from "./pages/auth/verify-user";
import Protect from "./components/protect";
import SignOutPage from "./pages/auth/sign-out-page";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/portal" element={<Protect />}>
                    <Route path="app/:id" element={<ApplicationLayout />}>
                        <Route path="configure" element={<AppConfig />} />
                        <Route index element={<AppDocs />} />
                    </Route>
                    <Route path="new-app" element={<NewAppPage />} />
                    <Route index element={<MyAppsPage />} />
                </Route>
                <Route path="/auth">
                    <Route path="verify-user" element={<VerifyUserPage />} />
                    <Route path="sign-in" element={<SignInPage />} />
                    <Route path="sign-out" element={<Protect />}>
                        <Route index element={<SignOutPage />} />
                    </Route>
                </Route>
                <Route
                    path="/subscription-success"
                    element={<SubscriptionSuccessPage />}
                />
                <Route
                    path="/subscription-fail"
                    element={<SubscriptionFailPage />}
                />
                <Route path="/waitlist">
                    <Route path="success" element={<WaitlistSuccess />} />
                    <Route index element={<WaitlistPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
