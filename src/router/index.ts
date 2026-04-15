import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';
import Result from '../views/Result.vue';
import Types from '../views/Types.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/types',
    name: 'Types',
    component: Types
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;