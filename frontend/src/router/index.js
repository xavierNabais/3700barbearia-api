import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landingpage.vue';
import Utilizadores from '../views/painel/utilizadores.vue';
import Servicos from '../views/painel/servicos.vue';
import Barbeiros from '../views/painel/barbeiros.vue';
import Marcacoes from '../views/painel/marcacoes.vue';
import loginPage from '../views/auth/login.vue';
import editarPerfil from '../views/perfil/edit.vue';
import perfilMarcacoes from '../views/perfil/marcacoes.vue';
import perfilRecompensa from '../views/perfil/recompensa.vue';
import indexPainel from '../views/painel/index.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path: '/perfil',
    name: 'editarPerfil',
    component: editarPerfil
  },
  {
    path: '/perfil/marcacoes',
    name: 'perfilMarcacoes',
    component: perfilMarcacoes
  },
  {
    path: '/perfil/recompensa',
    name: 'perfilRecompensa',
    component: perfilRecompensa
  },
  {
    path: '/painel',
    name: 'indexPainel',
    component: indexPainel
  },
  {
    path: '/painel/utilizadores',
    name: 'PainelUtilizadores',
    component: Utilizadores
  },
  {
    path: '/painel/servicos',
    name: 'PainelServicos',
    component: Servicos
  },
  {
    path: '/painel/barbeiros',
    name: 'PainelBarbeiros',
    component: Barbeiros
  },
  {
    path: '/painel/marcacoes',
    name: 'PainelMarcacoes',
    component: Marcacoes
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'NotFound' }
  }
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Verifica se a rota é para o painel
  if (to.path.startsWith('/painel')) {
    try {
      const isAdmin = localStorage.getItem('type');

      // Verifica se o usuário é um administrador
      if (isAdmin == 1) {
        next(); // Permite o acesso à próxima rota
      } else {
        next('/404'); // Redireciona para uma página de acesso negado ou outra página adequada
      }
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      next('/404'); // Redireciona para uma página de erro em caso de falha na chamada de API
    }
  } else if (to.path.startsWith('/perfil')) {
    const userId = localStorage.getItem('userId');

    if (userId) {
      next(); // Permite o acesso à próxima rota se o userId existir
    } else {
      next('/login'); // Redireciona para a página de login se o userId não existir
    }
  } else {
    next(); // Permite o acesso à próxima rota se não for uma rota do painel ou perfil
  }
});


export default router;
