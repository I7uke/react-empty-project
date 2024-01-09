import { PageContainer } from "../../../components/pageContainer";
import { PageContent } from "../../../components/pageContent";
import { PageFooter } from "../../../components/pageFooter";
import { PageTitle } from "../../../components/pageTitle";

/**
 * Главная страница
 */
export default function HomePage() {
    return (
        <PageContainer>
            <PageTitle pageTitle={'Главная страница'} />
            <PageContent>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
                <h1>Page Home</h1>
            </PageContent>
            <PageFooter/>
        </PageContainer>
    );
}