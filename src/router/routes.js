const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: "", redirect: '/private'},
      {
        path: 'change/password', component: () => import('pages/public/Recovery.vue'),
        beforeEnter: (to, from, next) => {
          const url = new URL(location);
          const token = url.searchParams.get('recovery_token');
          sessionStorage.setItem('recovery_token_passwd', token);
          /*
          * Limpiar url de params
          * */

          window.history.pushState({}, document.title, "/#/change/password");
          next()
        }
      },
    ]
  },
  {
    path: '/private',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: "", redirect: 'inici'},
      {path: 'inici', component: () => import('pages/private/Index.vue')},
      {path: 'alumnes', component: () => import('pages/private/Alumnes.vue')},
      {path: 'dies', component: () => import('pages/private/Dies.vue')}, {
        path: 'llista',
        component: () => import('pages/private/Llista.vue')
      },
      {path: 'alumne/:id', component: () => import('pages/private/Alumne.vue')}
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: '', component: () => import('pages/public/Login.vue')},
      {
        path: 'oauth/callback',
        beforeEnter: (to, from, next) => {

          const url = new URL(location);
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');

          const cuiner = JSON.parse(url.searchParams.get('isCuiner'));
          const monitor = JSON.parse(url.searchParams.get('isMonitor'));

          const userRoles = []
          if (cuiner) {
            userRoles.push(process.env.CUINER_ROL)
          }
          if (monitor) {
            userRoles.push(process.env.MONITOR_ROL)
          }
          localStorage.setItem('rol', JSON.stringify(userRoles));

          /*
          * Save tokens
          * */
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          /*
          * Limpiar url de params
          * */
          window.history.pushState({}, document.title, "/");
          next('/private/inici');
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/errors/Error404.vue')
  })
}

export default routes
