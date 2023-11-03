import { TestBlock } from "../testBlock";
import ImagetestCat3 from '../../../../img/img_base64/testCat_3.jpg';
import ImagetestCat1 from '../../../../img/img_url/testCat_1.jpg';
import React from "react";
import styles from './testImagesStyle.scss';
import SvgIcoBasket from '../../../../img/svg_ico/basket.svg';
import SvgIcoCheck from '../../../../img/svg_ico/check.svg';
import SvgIcoDownload from '../../../../img/svg_ico/download.svg';
import SvgIcoPlus from '../../../../img/svg_ico/plus.svg';

import SvgComponentTest2 from '../../../../img/svg_component/testSvg_2.svg';


function TestImages() {
    return (
        <div>
            <TestBlock
                label={'Картинка base64 в теге img:'}
            >
                <img className={styles.image} src={ImagetestCat3} />
            </TestBlock>

            <TestBlock
                label={'Картинка base64 как фон:'}
            >
                <div className={`${styles.imageBg} ${styles.imageBgBase64} ${styles.image}`} />
            </TestBlock>

            <TestBlock
                label={'Картинка url в теге img:'}
            >
                <img className={styles.image} src={ImagetestCat1} />
            </TestBlock>

            <TestBlock
                label={'Картинка url как фон:'}
            >
                <div className={`${styles.imageBg} ${styles.imageBgUrl} ${styles.image}`} />
            </TestBlock>

            <TestBlock
                label={'SVG как иконки шрифтов:'}
            >
                <div className={styles.svgFontsContainer}>
                    <SvgIcoBasket />
                    <SvgIcoCheck />
                    <SvgIcoDownload />
                    <SvgIcoPlus />
                </div>
            </TestBlock>

            <TestBlock
                label={'SVG как компонент:'}
            >
                <SvgComponentTest2 className={styles.svg}/>
            </TestBlock>


            <TestBlock
                label={'SVG url как фон:'}
            >
                <div className={`${styles.imageBg} ${styles.svgBgUrl} ${styles.image}`} />
            </TestBlock>

            <TestBlock
                label={'SVG base64 как фон:'}
            >
                <div className={`${styles.imageBg} ${styles.svgBgBase64} ${styles.image}`} />
            </TestBlock>
        </div>
    );
}

export default React.memo(TestImages);