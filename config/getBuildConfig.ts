const path = require("path");

type Mode = 'development' | 'production';
type ProjectBuildConfig = {
    readonly realHtmlPagesFolderPath: string;
    readonly commonStylePath: string;
    readonly publicPath: string;
    readonly isDevelopment: boolean;
    readonly outputPath: string;
    readonly mode: Mode;
    readonly faviconPath: string;
    readonly htmlTemplatePath: string;
    readonly dateBuildTimestamp: number;
    readonly dateBuildHumanUnderstandable: string;
}

function getOutputPath(isDev: boolean): string {
    if (isDev) {
        return path.resolve('./build');
    }

    return path.resolve('./build');
}

function getMode(isDev: boolean): Mode {
    if (isDev) {
        return 'development';
    }

    return 'production';
}

export default function getBuildConfig(isDev: boolean): ProjectBuildConfig {
    const dateBuild: Date = new Date();

    return {
        realHtmlPagesFolderPath: path.resolve('./realHtmlPages'),
        commonStylePath: path.resolve('./style/commonPageStyle.scss'),
        publicPath: '/',
        isDevelopment: isDev,
        dateBuildHumanUnderstandable:dateBuild.toLocaleString(),
        dateBuildTimestamp: +dateBuild,
        outputPath: getOutputPath(isDev),
        mode: getMode(isDev),
        faviconPath: path.resolve('./img/favicon/favicon.ico'),
        htmlTemplatePath:path.resolve('./pageTemplate.html')
    }
}