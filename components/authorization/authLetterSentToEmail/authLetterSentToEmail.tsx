import { AuthButton } from "../authButton";
import SvgSendEmail from '../../../img/svg_component/sendEmail.svg'
import styles from './authLetterSentToEmail.module.scss';

interface Props {
    readonly helpText: string;
    readonly returnLink: string;
    readonly returnToLinkText: string;
}

export default function AuthLetterSentToEmail(props: Props) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.imgContainer}>
                <SvgSendEmail className={styles.svgSendEmail} />
            </div>
            <div className={styles.helpText}>
                {props.helpText}
            </div>
            <AuthButton
                text={props.returnToLinkText}
                eventClickOrLink={props.returnLink}
            />
        </div>
    );
}