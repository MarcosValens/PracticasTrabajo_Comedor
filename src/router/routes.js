
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: "", redirect: 'inici'},
      {path: 'inici', component: () => import('pages/private/Index.vue')},
      {path: 'alumnes', component: () => import('pages/private/Alumnes.vue')},
      {path: 'professors', component: () => import('pages/private/Professors.vue')},
      {path: 'usuaris', component: () => import('pages/private/Usuaris.vue')},
      {path: 'dies', component: () => import('pages/private/Dies.vue')},
      {path: 'llista', component: () => import('pages/private/Llista.vue')},
      {path: 'alumne/:id', component: () => import('pages/private/Alumne.vue')},
      {path: 'dia/:id', component: () => import('pages/private/Dia.vue')},
      {path: 'professor/:id', component: () => import('pages/private/Professor.vue')},
      {path: 'usuari/:id', component: () => import('pages/private/Usuari.vue')},
      { path: 'admin', component: () => import('pages/private/PanellAdmin.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/public/Login.vue') },
      {
        path: 'oatuh/callback',
        beforeEnter: (to, from, next) => {
          const url = new URL(location);
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');

          // TODO, cuando pasen el rol, lo guardaremos
          //const rol = url.searchParams.get('rol');
          //localStorage.setItem('rol', rol);

          /*
          * Save tokens
          * */
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          /*
          * Limpiar url de params
          * */
          window.history.pushState({}, document.title, "/");
          next('/inici');
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
