import styles from "./pageContainerStyle.scss";

interface PageContainerProps {
    readonly children: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {

    return (
        <div className={styles.pageContainer}>
            {props.children}
        </div>
    );
}