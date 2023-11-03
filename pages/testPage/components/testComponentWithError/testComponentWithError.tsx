
type Props = {
    readonly errorText?: string;
}

export default function TestComponentWithError(props: Props) {
    if (props.errorText) {
        throw new Error(props.errorText)
    }

    return <div>{'Ошибки нет =_'}</div>
}
