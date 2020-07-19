import Main from 'pages/Main';
import Authorization from './pages/Authorization';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: Main,
    sagasToRun: [],
    title: 'Main',
  },
  {
    path: '/auth',
    exact: true,
    cache: false,
    component: Authorization,
    sagasToRun: [],
    title: 'Auth',
  },
];
