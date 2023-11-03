export interface SitePageInfo<TPageKey extends string> {
    /**
     * Публичное название страницы
     */
    readonly publicName: string;
    /**
     * Название вкладки браузера
     */
    readonly browserTabTitle: string;
    /**
     * Полный путь до страницы
     */
    readonly fullPath: string;
    /**
     * Уникальный ключ страницы
     */
    readonly uniqueKey: TPageKey;
    /**
     * Ключ родителя
     */
    readonly parentKey: TPageKey | undefined;
}