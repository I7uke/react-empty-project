import { Link } from "react-router-dom";
import { ErrorFuse } from "../../../components/errorFuse";
import { Error404 } from "../../../components/error404";
import { TestImages } from "../components/testImages";
import { TestBlock } from "../components/testBlock";
import { PageContainer } from "../../../components/pageContainer";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import { StoreTestPage } from "../stores/storeTestPage";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { TestSelect } from "../components/testSelect";
import { TestMultiSelect } from "../components/testMultiSelect";
import { LoaderAtom } from "../../../components/loaderAtom";
import { LoaderDots } from "../../../components/loaderDots";
import { LoaderSpinner } from "../../../components/loaderSpinner";
import { Checkbox } from "../../../components/checkbox";
import { CheckboxWithLabel, CheckboxWithLabelSmart } from "../../../components/checkboxWithLabel";
import CheckboxSmart from "../../../components/checkbox/component/checkboxSmart";
import { TestRow } from "../components/testRow";
import { CheckboxSwitch, CheckboxSwitchSmart } from "../../../components/checkboxSwitch";
import { TestInputText } from "../components/testInputText";
import { ErrorBoundary } from "../../../components/errorBoundary";
import { TestComponentWithError } from "../components/testComponentWithError";
import { TestInputNumber } from "../components/testInputNumber";
import { TestInputTextarea } from "../components/testInputTextarea";
import TestInputDate from "../components/testInputDate/testInputDate";
import TestInputDateRange from "../components/testInputDateRange/testInputDateRange";
import TestQuillRichTextEditor from "../components/testInputDraftJsRichTextEditor/testQuillRichTextEditor";


function TestPage(props: SmartComponentProps<StoreTestPage>) {

    useEffect(() => {
        props.store.eventPageShown();
        console.log('eventPageShown');

        return (() => {
            props.store.eventPageExit();
            console.log('eventPageExit');
        });
    }, []);



    if (!props.store.storeContentPage) {
        return;
    }

    return (
        <PageContainer>
            <h1>Page 1</h1>
            <ul>
                <li>
                    <Link to={'/page2'}>
                        Page2
                    </Link>
                </li>
                <li>
                    <Link to={'/page3'}>
                        Page3
                    </Link>
                </li>
            </ul>

            <TestImages />

            <TestBlock
                label={'Загрузка атом:'}
            >
                <LoaderAtom loaderText={'Текст загрузки'} />
            </TestBlock>

            <TestBlock
                label={'Загрузка спинер:'}
            >
                <LoaderSpinner loaderText={'Текст загрузки'} />
            </TestBlock>

            <TestBlock
                label={'Загрузка точки:'}
            >
                <LoaderDots />
            </TestBlock>

            <TestBlock
                label={'Перехватчик ошибок:'}
            >
                <ErrorBoundary>
                    <TestComponentWithError errorText={'Какой-то текст ошибки!'} />
                </ErrorBoundary>
            </TestBlock>

            <TestBlock
                label={'Страница 404:'}
            >
                <Error404 />
            </TestBlock>

            <TestBlock
                label={'Выпадающий список:'}
            >
                <TestSelect store={props.store.storeContentPage.storeSelect} />
            </TestBlock>

            <TestBlock
                label={'Выпадающий список множественны выбор:'}
            >
                <TestMultiSelect store={props.store.storeContentPage.storeMultiSelect} />
            </TestBlock>

            <TestBlock label={'Текстовое поле ввода:'}>
                <TestInputText store={props.store.storeContentPage.storeComponentInputText} />
            </TestBlock>

            <TestBlock label={'Многострочное текстовое поле ввода:'}>
                <TestInputTextarea store={props.store.storeContentPage.storeComponentInputTextarea} />
            </TestBlock>

            <TestBlock label={'Редактор форматированного текста:'}>
                <TestQuillRichTextEditor store={props.store.storeContentPage.storeComponentInputDraftJs}/>
            </TestBlock>

            <TestBlock label={'Числовое поле ввода:'}>
                <TestInputNumber store={props.store.storeContentPage.storeComponentInputNumber} />
            </TestBlock>

            <TestBlock label={'Поле выбора даты:'}>
                <TestInputDate store={props.store.storeContentPage.storeComponentInputDate} />
            </TestBlock>

            <TestBlock label={'Поле выбора промежутка дат:'}>
                <TestInputDateRange store={props.store.storeContentPage.storeComponentInputDateRange} />
            </TestBlock>

            <TestBlock
                label={'Checkbox:'}
            >
                <TestRow>
                    <Checkbox
                        eventChange={(e) => {
                            console.log(e.currentTarget.checked)
                        }}
                    />
                </TestRow>

                <TestRow>
                    <CheckboxSmart store={props.store.storeContentPage.storeComponentCheckbox1} />
                </TestRow>

            </TestBlock>

            <TestBlock
                label={'Checkbox с подписью:'}
            >
                <TestRow>
                    <CheckboxWithLabel
                        eventChange={(e) => {
                            console.log(e.currentTarget.checked);
                        }}
                        label={'Lorem ipsum dolor sit amet, his nonumy ullamcorper definitiones eu'}
                    />
                </TestRow>

                <TestRow>
                    <CheckboxWithLabelSmart
                        store={props.store.storeContentPage.storeComponentCheckbox2}
                        label={'Lorem ipsum dolor sit amet, his nonumy ullamcorper definitiones eu'}
                    />
                </TestRow>
            </TestBlock>

            <TestBlock
                label={'CheckboxSwitch:'}
            >
                <TestRow>
                    <CheckboxSwitch
                        eventChange={(e) => {
                            console.log(e.currentTarget.checked);
                        }}
                        size={'large'}
                    />
                </TestRow>

                <TestRow>
                    <CheckboxSwitch
                        eventChange={(e) => {
                            console.log(e.currentTarget.checked);
                        }}
                        size={'default'}
                    />
                </TestRow>

                <TestRow>
                    <CheckboxSwitch
                        eventChange={(e) => {
                            console.log(e.currentTarget.checked);
                        }}
                        size={'small'}
                    />
                </TestRow>

                <TestRow>
                    <CheckboxSwitchSmart
                        store={props.store.storeContentPage.storeComponentCheckbox3}
                        size={'large'}
                    />
                </TestRow>
            </TestBlock>
        </PageContainer>
    );
}

export default observer(TestPage);