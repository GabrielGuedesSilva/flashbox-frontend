import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
        { path: '', component: () => import('@/views/HomeView.vue'), meta: { requiresAuth: true } },
        { path: 'perfil', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },
        { path: 'flashcard_stacks', component: () => import('@/views/FlashcardStacksView.vue'), meta: { requiresAuth: true } },
        { path: 'flashcard_stacks/:flashcard_stack_id', component: () => import('@/views/SingleFlashcardStackView.vue'), meta: { requiresAuth: true } },
        { path: 'exercícios', component: () => import('@/views/ExerciseView.vue'), meta: { requiresAuth: true } },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/users',
    name: 'registerUser',
    component: () => import('../views/RegisterUserView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    
    if (!token) {
      return next('/login');
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      return next('/login');
    }
  }

  next();
});


export default router
