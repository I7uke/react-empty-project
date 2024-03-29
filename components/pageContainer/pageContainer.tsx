import styles from './styles.module.scss';

interface PageContainerProps {
    readonly children: React.ReactNode;
}

/**
 * Контент страницы
 * @param props 
 * @returns 
 */
export default function PageContainer(props: PageContainerProps) {
    return (
        <div className={styles.pageContainer}>
            {props.children}
        </div>
    );
}