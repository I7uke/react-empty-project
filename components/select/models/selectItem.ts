type ItemValue = string | number;
export interface SelectItem<TValue extends ItemValue> {
    readonly label: string;
    readonly value: TValue;
}