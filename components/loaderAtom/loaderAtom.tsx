import React from "react";
import styles from './loaderAtomStyle.scss';
import SvgLoaderRing from '../../img/svg_component/loaderRing.svg';

interface Props {
    readonly loaderText?: string;
}

function LoaderAtom(props: Props) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.loading}>
                <div className={styles.loadingRing}>
                    <SvgLoaderRing />
                </div>
                <div className={styles.loadingRing}>
                    <SvgLoaderRing />
                </div>
            </div>
            {
                props.loaderText ?
                    <div className={styles.ladingText}>
                        {props.loaderText}
                    </div> : null
            }
        </div>
    );
}

export default React.memo(LoaderAtom);