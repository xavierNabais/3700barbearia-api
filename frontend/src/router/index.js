import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landingpage.vue';
import Utilizadores from '../views/painel/utilizadores.vue';
import Servicos from '../views/painel/servicos.vue';
import Barbeiros from '../views/painel/barbeiros.vue';
import Marcacoes from '../views/painel/marcacoes.vue';
import loginPage from '../views/auth/login.vue';
import agendaFuncionario from '../views/painel/funcionario/agendaFuncionario.vue';
import editarPerfil from '../views/perfil/edit.vue';
import perfilMarcacoes from '../views/perfil/marcacoes.vue';
import perfilRecompensa from '../views/perfil/recompensa.vue';
import indexPainel from '../views/painel/index.vue';
import NotFound from '../views/NotFound.vue';
import { jwtDecode } from 'jwt-decode';

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
    path: '/agenda',
    name: 'agendaFuncionario',
    component: agendaFuncionario
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
  if (to.path.startsWith('/painel')) {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.admin === 1) {
          next(); 
        } else {
          next('/404');
        }
      } else {
        next('/login');
      }
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      next('/404'); 
    }
  } else if (to.path.startsWith('/perfil')) {
    const token = localStorage.getItem('token');

    if (token) {
      next(); 
    } else {
      next('/login'); 
    }
  } else {
    next(); 
  }
});


export default router;
