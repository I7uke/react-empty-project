import { useCallback, useState } from "react";
import { validationString } from "ts-common-helpers";
import { ROUTER_PAGES_AUTHORIZATION } from "../../../staticData/routerPages/routerPagesAuthorization";
import { ForgotPasswordHelpText } from "../components/forgotPasswordHelpText";
import { AuthButton, AuthButtonsContainer } from "../../../components/authorization/authButton";
import { AuthServerError } from "../../../components/authorization/authServerError";
import { AuthPanel } from "../../../components/authorization/authPanel";
import { AuthTitle } from "../../../components/authorization/authTitle";
import { InputForgotPassword } from "../components/inputForgotPassword";
import { ComponentInputForgotPasswordProps } from "../components/inputForgotPassword/inputForgotPassword";
import { AuthLetterSentToEmail } from "../../../components/authorization/authLetterSentToEmail";

type AuthInputOptions = Omit<ComponentInputForgotPasswordProps, 'eventChange' | 'type' | 'placeholder'>;

interface ForgotPasswordStatus {
    readonly isLoading: boolean;
    readonly serverError?: string | undefined;
    readonly sentToEmail?: string;
}

export default function AuthorizationForgotPasswordPage() {
    const [inputEmailState, setInputEmailState] = useState<AuthInputOptions>({
        value: '',
    });

    const [forgotPasswordStatus, setForgotPasswordStatus] = useState<ForgotPasswordStatus>({
        isLoading: false,
    });

    const handleInputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setInputEmailState((prevState) => ({
            ...prevState,
            value,
            errorText: undefined,
            status: 'default'
        }));
    }, []);

    const handleAthorization = useCallback(() => {
        const sendEmail: string = validationString({
            value: inputEmailState.value,
            defaultValue: ''
        });

        if (!sendEmail) {
            setInputEmailState((prevState) => ({
                ...prevState,
                errorText: 'Поле "Почта" должно быть заполнено',
                status: 'error'
            }));

            return;
        }

        setInputEmailState((prevState) => ({
            ...prevState,
            isReadOnly: true,
            errorText: undefined,
            status: 'default'
        }));

        setForgotPasswordStatus({
            isLoading: true,
            serverError: 'Lorem ipsum dolor sit amet, consectetur'
        });

        alert(`Запрос на сервер: Почта:${sendEmail}`);

        setTimeout(()=>{
            setForgotPasswordStatus({
                isLoading: false,
                sentToEmail: sendEmail,
                serverError: undefined
            }); 
        }, 3000)

    }, [inputEmailState]);


    if(forgotPasswordStatus.sentToEmail) {
        return (
            <AuthPanel>
                <AuthLetterSentToEmail
                    helpText={`На Вашу почту ${forgotPasswordStatus.sentToEmail} было отправлено письмо с дальнейшими шагами для восстановления пароля`}
                    returnLink={ROUTER_PAGES_AUTHORIZATION.authLogin.fullPath}
                    returnToLinkText={'Авторизация'}
                />
            </AuthPanel>
        );
    }

    return (
        <AuthPanel>
            <AuthTitle title='Восстановления пароля' />
            <ForgotPasswordHelpText helpText='Требуется проверить вашу личность, укажите почту указанную при регистрации, для получения дальнейших шагов' />
            <InputForgotPassword
                {...inputEmailState}
                placeholder={'Почта'}
                eventChange={handleInputEmail}
            />
            {
                forgotPasswordStatus.serverError ?
                    <AuthServerError errorText={forgotPasswordStatus.serverError} />
                    : null
            }
            <AuthButtonsContainer>
                <AuthButton
                    eventClickOrLink={handleAthorization}
                    text={'Восстановить'}
                    isLoading={forgotPasswordStatus.isLoading}
                />
                <AuthButton
                    eventClickOrLink={ROUTER_PAGES_AUTHORIZATION.authLogin.fullPath}
                    type={'secondary'}
                    text={'Отмена'}
                />
            </AuthButtonsContainer>
        </AuthPanel>
    );
}