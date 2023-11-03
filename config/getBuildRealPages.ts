import HtmlWebpackPlugin from "html-webpack-plugin";

const fs = require('fs');

function validCommonPaths(inputPaths?: string[] | undefined | null): string[] {
    if (!Array.isArray(inputPaths)) {
        return [];
    }

    const result: string[] = [];
    for (let path of inputPaths) {
        if (path) {
            if (typeof path === 'string') {
                result.push(path);
            }
        }
    }

    return result;
}

type BuildRealPages = {
    readonly entry: Record<string, string[]>;
    readonly htmlPages: HtmlWebpackPlugin[];
}

type Params = {
    readonly realHtmlPagesFolderPath: string;
    readonly common: string[]
    readonly publicPath: string;
    readonly faviconPath: string;
    readonly htmlTemplatePath: string;
    readonly outputPath: string;
}

export default function getBuildRealPages(params: Params): BuildRealPages {
    const resultEntry: Record<string, string[]> = {};
    const resultHtmlPages: HtmlWebpackPlugin[] = [];
    const commonPaths: string[] = validCommonPaths(params.common);
    const projectRealPages: string[] = fs.readdirSync(params.realHtmlPagesFolderPath);

    for (const page of projectRealPages) {
        const currentPagePath: string = `${params.realHtmlPagesFolderPath}/${page}/page.tsx`;
        if (fs.existsSync(currentPagePath)) {
            resultEntry[page] = [
                ...commonPaths,
                currentPagePath
            ];

            resultHtmlPages.push(new HtmlWebpackPlugin({
                template: params.htmlTemplatePath,
                favicon: params.faviconPath,
                publicPath: params.publicPath,
                title: '',
                chunks: [page],
                filename: `${params.outputPath}/${page}.html`
            }));
        }
    }

    return {
        entry: resultEntry,
        htmlPages: resultHtmlPages
    };
}