import styles from './styles.module.scss';

interface Props {
    /**
     * Заголовок страницы
     */
    readonly pageTitle: string;
}

/**
 * Заголовок страницы
 * @param props 
 * @returns 
 */
export default function PageTitle(props: Props) {
    return(
        <h1 className={styles.pageTitle}>
            {props.pageTitle}
        </h1>
    );
}