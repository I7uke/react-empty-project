import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoaderSuspense } from "../../components/loaderSuspense";
import { Suspense } from "react";
import { Error404 } from "../../components/error404";
import TestPage from "../../pages/testPage/page/testPage";
import { StoreTestPage } from "../../pages/testPage/stores/storeTestPage";

const storeTestPage = new StoreTestPage();

export default function ComponentPage() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoaderSuspense />}>
                <Routes>
                    <Route
                        path={'/'}
                        index
                        element={<TestPage store={storeTestPage}/>}
                    />
                    <Route
                        path={'/page2'}
                        index
                        element={<h1>Page 2</h1>}
                    />
                    <Route
                        path={'/page3'}
                        index
                        element={<h1>Page 3</h1>}
                    />
                    <Route
                        path={'*'}
                        element={<Error404 />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}