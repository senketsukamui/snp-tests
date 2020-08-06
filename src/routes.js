import Main from 'pages/Main';
import Authorization from 'pages/Authorization';
import TestWindow from 'pages/TestWindow';
import TestPass from 'pages/TestPass';

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
  {
    path: '/test/:id',
    exact: false,
    cache: false,
    component: TestWindow,
    sagasToRun: [],
    title: 'Test Window',
  },
  {
    path: '/pass/:id',
    exact: false,
    cache: false,
    component: TestPass,
    sagasToRun: [],
    title: 'Test Pass',
  },
];
