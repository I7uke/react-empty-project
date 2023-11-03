import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoaderSuspense } from "../../loaderSuspense";
import styles from './authBackground.module.scss';

export default function AuthBackground() {
    return (
        <div className={styles.background}>
            <Suspense fallback={<LoaderSuspense />}>
                <Outlet />
            </Suspense>
        </div>
    );
}