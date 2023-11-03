import { Suspense } from "react";
import {HashRouter, Route, Routes } from "react-router-dom";
import { LoaderSuspense } from "../../components/loaderSuspense";
import { Error404 } from "../../components/error404";
import { ErrorBoundary } from "../../components/errorBoundary";
import { ROUTER_PAGES_AUTHORIZATION } from "../../staticData/routerPages/routerPagesAuthorization";
import { AuthBackground } from "../../components/authorization/authBackground";
import AuthLoginPage from "../../pages/authLogin/page/authLoginPage";
import AuthForgotPasswordPage from "../../pages/authForgotPassword/page/authForgotPasswordPage";

export default function ComponentPage() {
    return (
        <HashRouter>
            <Suspense fallback={<LoaderSuspense/>}>
                <Routes>
                    <Route element={<AuthBackground/>}>
                        <Route
                            path={ROUTER_PAGES_AUTHORIZATION.authLogin.fullPath}
                            element={
                                <ErrorBoundary key={ROUTER_PAGES_AUTHORIZATION.authLogin.uniqueKey}>
                                    <AuthLoginPage/>
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path={ROUTER_PAGES_AUTHORIZATION.authForgotPassword.fullPath}
                            element={
                                <ErrorBoundary key={ROUTER_PAGES_AUTHORIZATION.authForgotPassword.uniqueKey}>
                                    <AuthForgotPasswordPage />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path={ROUTER_PAGES_AUTHORIZATION.authSignup.fullPath}
                            element={
                                <ErrorBoundary key={ROUTER_PAGES_AUTHORIZATION.authSignup.uniqueKey}>
                                    <h1>{'authRegistration'}</h1>
                                </ErrorBoundary>
                            }
                        />
                    </Route>
                    <Route
                        path={'*'}
                        element={<Error404/>}
                    />
                </Routes>
            </Suspense>
        </HashRouter>
    );
}