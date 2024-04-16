import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landingpage.vue';
import Utilizadores from '../views/painel/utilizadores.vue';
import Servicos from '../views/painel/servicos.vue';
import Barbeiros from '../views/painel/barbeiros.vue';
import editarPerfil from '../views/perfil/edit.vue';
import perfilMarcacoes from '../views/perfil/marcacoes.vue';
import perfilRecompensa from '../views/perfil/recompensa.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
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
