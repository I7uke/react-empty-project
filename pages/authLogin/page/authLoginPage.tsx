import { useCallback, useState } from "react";
import { InputLogin } from "../components/inputLogin";
import { ComponentInputLoginProps } from "../components/inputLogin/inputLogin";
import { validationString } from "ts-common-helpers";
import { AuthForgotPassword } from "../components/authForgotPassword";
import { ROUTER_PAGES_AUTHORIZATION } from "../../../staticData/routerPages/routerPagesAuthorization";
import { AuthServerError } from "../../../components/authorization/authServerError";
import { AuthButton, AuthButtonsContainer } from "../../../components/authorization/authButton";
import { AuthTitle } from "../../../components/authorization/authTitle";
import { AuthPanel } from "../../../components/authorization/authPanel";

type AuthInputOptions = Omit<ComponentInputLoginProps, 'eventChange' | 'type' | 'placeholder'>;

interface AuthorizationStatus {
    readonly isLoading: boolean;
    readonly serverError?: string | undefined;
}

export default function AuthLoginPage() {
    const [inputLoginState, setInputLoginState] = useState<AuthInputOptions>({
        value: '',
    });

    const [inputPasswordState, setInputPasswordState] = useState<AuthInputOptions>({
        value: '',
    });

    const [athorizationStatus, setAthorizationStatus] = useState<AuthorizationStatus>({
        isLoading: false,
    });

    const handleLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;

        setInputLoginState((prevState) => ({
            ...prevState,
            value,
            errorText: undefined,
            status: 'default'
        }));
    }, []);

    const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setInputPasswordState((prevState) => ({
            ...prevState,
            value,
            errorText: undefined,
            status: 'default'
        }));
    }, []);

    const handleAthorization = useCallback(() => {
        const sendLogin: string = validationString({
            value: inputLoginState.value,
            defaultValue: ''
        });

        let isHasError: boolean = false;

        if (!sendLogin) {
            setInputLoginState((prevState) => ({
                ...prevState,
                errorText: 'Поле "Логин" должно быть заполнено',
                status: 'error'
            }));

            isHasError = true;
        }

        const sendPassword: string = validationString({
            value: inputPasswordState.value,
            defaultValue: ''
        });

        if (!sendPassword) {
            setInputPasswordState((prevState) => ({
                ...prevState,
                errorText: 'Поле "Пароль" должно быть заполнено',
                status: 'error'
            }));

            isHasError = true;
        }

        if (isHasError) {
            return;
        }

        setInputLoginState((prevState) => ({
            ...prevState,
            isReadOnly: true,
            errorText: undefined,
            status: 'default'
        }));

        setInputPasswordState((prevState) => ({
            ...prevState,
            isReadOnly: true,
            errorText: undefined,
            status: 'default'
        }));

        setAthorizationStatus({
            isLoading: true,
            serverError: 'Lorem ipsum dolor sit amet, consectetur'
        });

        alert(`Запрос на сервер: Логин:${sendLogin} Пароль:${sendPassword}`);
    }, [inputLoginState, inputPasswordState]);

    return (
        <AuthPanel>
            <AuthTitle title={'Авторизация'} />
            <InputLogin
                {...inputLoginState}
                type={'text'}
                placeholder={'Логин'}
                eventChange={handleLogin}
            />

            <InputLogin
                {...inputPasswordState}
                type={'password'}
                placeholder={'Пароль'}
                eventChange={handlePassword}
            />
            {
                athorizationStatus.serverError ?
                    <AuthServerError errorText={athorizationStatus.serverError} />
                    : null
            }
            <AuthButtonsContainer>
                <AuthButton
                    eventClickOrLink={handleAthorization}
                    text={'Войти'}
                    isLoading={athorizationStatus.isLoading}
                />
                <AuthButton
                    eventClickOrLink={ROUTER_PAGES_AUTHORIZATION.authSignup.fullPath}
                    type={'secondary'}
                    text={'Зарегистрироваться'}
                />
            </AuthButtonsContainer>

            <AuthForgotPassword
                linkPageForgotPassword={ROUTER_PAGES_AUTHORIZATION.authForgotPassword.fullPath}
                text={'Забыли пароль?'}
            />
        </AuthPanel>
    );
}