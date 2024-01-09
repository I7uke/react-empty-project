import styles from './styles.module.scss';

interface Props {
    readonly children: React.ReactNode;
}

/**
 * Контент страницы
 * @param props 
 * @returns 
 */
export default function PageContent(props: Props) {
    return (
        <div className={styles.pageContent}>
            {props.children}
        </div>
    );
}