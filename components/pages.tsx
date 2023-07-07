const pages = [
  { name: 'Главная', src: '/' },
  { name: 'О нас', src: '/about' },
  { name: 'Места', src: '/places' },
  { name: 'Блог', src: '/blog' },
  { name: 'Форум', src: '/forum' },
  { name: 'Интернет-магазин', src: '/store' },
  { name: 'Контакты', src: '/contact' },
  { name: 'Мой аккаунт', src: '/myaccount', test(session: any) { return !!session; } },
  { name: 'Админ', src: '/admin', test(session:any) { return 'admin'===session?.user?.role; } }
];

export default pages;