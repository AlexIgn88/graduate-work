import { page } from '../datatypes/types'
import { FcSettings, FcBusinessman, FcEmptyTrash, FcFullTrash, FcViewDetails, FcInvite, FcPaid } from "react-icons/fc";

const userMenuItems: page[] = [
    {
        name: 'Настройки профиля',
        src: '/myaccount', restricted(session) { return !!session; },
        icon: FcSettings
    },
    // {
    //     name: 'Cообщения',
    //     src: '/', restricted(session) { return !!session; },
    //     icon: FcInvite
    // },
    {
        name: 'Корзина',
        src: '/basket', restricted(session) { return !!session; },
        icon: FcPaid
    },
    {
        name: 'Админ-панель',
        src: '/adminpanel', restricted(session) { return 'admin' === session?.user?.role; },
        icon: FcBusinessman
    },
    {
        name: 'Активные заказы',
        src: '/orders', restricted(session) { return !!session; },
        icon: FcViewDetails
    },
];

export default userMenuItems;