import { SitePageInfo } from "../../models/sitePageInfo";


type RouterPagesAuthorization = 'authLogin' | 'authSignup' | 'authForgotPassword';

export const ROUTER_PAGES_AUTHORIZATION: Record<RouterPagesAuthorization, SitePageInfo<RouterPagesAuthorization>> = Object.freeze({
    authLogin: Object.freeze({
        browserTabTitle: 'Авторизация',
        publicName: 'Авторизация',
        fullPath: '/login',
        parentKey: undefined,
        uniqueKey: 'authLogin'
    }),
    authSignup: Object.freeze({
        browserTabTitle: 'Регистрация',
        publicName: 'Регистрация',
        parentKey:undefined,
        fullPath: '/signup',
        uniqueKey: 'authSignup'
    }),
    authForgotPassword: Object.freeze({
        browserTabTitle: 'Восстановления пароля',
        publicName: 'Восстановления пароля',
        parentKey:undefined,
        fullPath: '/forgotPassword',
        uniqueKey: 'authForgotPassword'
    })
});