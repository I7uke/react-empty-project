import { action, computed, makeObservable, observable } from "mobx";


type EventChangeValue = (isChecked: boolean) => void;

interface Init {
    readonly isChecked: boolean;
    readonly eventChangeValue?: EventChangeValue | undefined;
}

export default class StoreComponentCheckbox {

    private _isChecked_observable: boolean;
    private readonly _eventChangeValue?: EventChangeValue | undefined;

    public eventChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
        const isChecked: boolean = !!e.currentTarget.checked;
        this._isChecked_observable = isChecked;

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(isChecked);
        }
    }

    public getSelectedValue(): boolean {
        return this._isChecked_observable;
    }

    get isChecked(): boolean {
        return this._isChecked_observable;
    }

    constructor(init: Init) {
        this.eventChangeValue = this.eventChangeValue.bind(this);
        this._isChecked_observable = init.isChecked;
        this._eventChangeValue = (typeof init.eventChangeValue === 'function') ? init.eventChangeValue : undefined;

        makeObservable<this,
            '_isChecked_observable'>(this, {
                _isChecked_observable: observable.ref,
                eventChangeValue: action,
                isChecked: computed,
            });
    }
}