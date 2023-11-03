import { BaseStorePage } from "ts-mobx-data-management";
import { StorePageContent } from "./storePageContent";

export class StoreTestPage extends BaseStorePage<StorePageContent> {
    constructor() {
        super({
            isForgetDataAfterLeaving: true,
            uniquePageKey: 'test'
        });
    }

    public eventPageShown() {
        super.eventPageShown();
        const storeContentPage = new StorePageContent();
        this._setStoreContentPage(storeContentPage);
    }
}
