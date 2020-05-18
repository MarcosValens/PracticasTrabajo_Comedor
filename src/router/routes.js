
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'alumnes', component: () => import('pages/Alumnes.vue') },
      { path: 'professors', component: () => import('pages/Professors.vue') },
      { path: 'usuaris', component: () => import('pages/Usuaris.vue') },
      { path: 'dies', component: () => import('pages/Dies.vue') },
      { path: 'llista', component: () => import('pages/Llista.vue') },
      { path: 'alumne/:id', component: () => import('pages/Alumne.vue') },
      { path: 'dia/:id', component: () => import('pages/Dia.vue') },
      { path: 'professor/:id', component: () => import('pages/Professor.vue') },
      { path: 'usuari/:id', component: () => import('pages/Usuari.vue') },
      { path: 'admin', component: () => import('pages/PanellAdmin.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/public/Login.vue') },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
