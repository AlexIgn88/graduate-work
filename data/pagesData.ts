import { page } from '../datatypes/types'

const pages: page[] = [
  { name: 'Главная', src: '/' },
  { name: 'О нас', src: '/about' },
  { name: 'Места', src: '/places' },
  // { name: 'Блог', src: '/blog' },
  { name: 'Форум', src: '/forum' },
  // { name: 'Магазин сувениров', src: '/store' },
  { name: 'Контакты', src: '/contact' },
  { name: 'Админ-панель', src: '/adminpanel', restricted(session) { return 'admin' === session?.user?.role; } }
];

export default pages;