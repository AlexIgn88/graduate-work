import { page } from '../datatypes/types'
import { FcSettings, FcBusinessman, FcEmptyTrash, FcFullTrash, FcManager, FcInvite } from "react-icons/fc";

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
        src: '/', restricted(session) { return !!session; },
        icon: FcEmptyTrash
    },
    {
        name: 'Админ-панель',
        src: '/adminpanel', restricted(session) { return 'admin' === session?.user?.role; },
        icon: FcBusinessman
    },
    {
        name: 'Заказы Клиентов',
        src: '/', restricted(session) { return 'admin' === session?.user?.role || 'manager' === session?.user?.role; },
        icon: FcManager
    },
];

export default userMenuItems;