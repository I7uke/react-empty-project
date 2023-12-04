interface BaseValidatedValue<TValue, TErrorText, TError extends boolean> {
    readonly result: TValue;
    readonly error: TErrorText;
    readonly isError: TError;
}

export type ValidatedValue<TValue> = BaseValidatedValue<TValue, undefined, false> | BaseValidatedValue<undefined, string, true>;