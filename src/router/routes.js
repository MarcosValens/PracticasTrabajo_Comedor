const routes = [
  {
    path: '/',
    children: [
      {path: "", redirect: '/private'},
    ]
  },
  {
    path: '/private',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: "", redirect: 'inici'},
      {path: 'inici', component: () => import('pages/private/Index.vue')},
      {path: 'alumnes', component: () => import('pages/private/Alumnes.vue')},
      {path: 'dies', component: () => import('pages/private/Dies.vue')},
      {path: 'llista', component: () => import('pages/private/Llista.vue')},
      {path: 'alumne/:id', component: () => import('pages/private/Alumne.vue')},
      {path: 'dia/:id', component: () => import('pages/private/Dia.vue')},
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      // TODO MODIFICAR ESTO CUANDO HAYA ROLES
      // const rol = localStorage.getItem('rol');
      // if (!rol) {
      //   next('/login');
      // }

      if (!token) {
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: "", redirect: 'panel'},
      {path: 'panel', component: () => import('pages/private/admin/PanellAdmin.vue')},
      {path: 'professor/:id', component: () => import('pages/private/admin/Professor.vue')},
      {path: 'usuari/:id', component: () => import('pages/private/admin/Usuari.vue')},
      {path: 'professors', component: () => import('pages/private/admin/Professors.vue')},
      {path: 'usuaris', component: () => import('pages/private/admin/Usuaris.vue')},
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');

      // TODO MODIFICAR ESTO CUANDO HAYA ROLES
      // const rol = localStorage.getItem('rol');
      // if (!rol) {
      //   next('/login');
      // }

      //if (!token || rol.toLowerCase() !== process.env.ADMIN_ROL.toLowerCase()){
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

          const admin = JSON.parse(url.searchParams.get('isAdmin'));
          const cuiner = JSON.parse(url.searchParams.get('isCuiner'));
          const monitor = JSON.parse(url.searchParams.get('isMonitor'));

          const userRoles=[]
          if (cuiner) {
            userRoles.push(process.env.CUINER_ROL)
          }
          if (monitor) {
            userRoles.push(process.env.MONITOR_ROL)
          }
          if (admin) {
            userRoles.push(process.env.ADMIN_ROL)
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
      },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/private/Error404.vue')
  })
}

export default routes
