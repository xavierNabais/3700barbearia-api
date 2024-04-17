import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landingpage.vue';
import Utilizadores from '../views/painel/utilizadores.vue';
import Servicos from '../views/painel/servicos.vue';
import Barbeiros from '../views/painel/barbeiros.vue';
import loginPage from '../views/auth/login.vue';
import editarPerfil from '../views/perfil/edit.vue';
import perfilMarcacoes from '../views/perfil/marcacoes.vue';
import perfilRecompensa from '../views/perfil/recompensa.vue';
import indexPainel from '../views/painel/index.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
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
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
