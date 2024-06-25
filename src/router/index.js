import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ConferencePage from '../views/ConferencePage.vue'
import JournalPage from '../views/JournalPage.vue'
import ConferenceDetailPage from '../views/ConferenceDetailPage.vue' // 导入会议详情页面组件
import JournalDetailPage from '../views/JournalDetailPage.vue' // 导入期刊详情页面组件
import AccountPage from '../views/AccountPage.vue'
import SearchResultsPage from '../views/SearchResultsPage.vue';
import AdminPage from '../views/AdminPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/conference', component: ConferencePage },
  { path: '/journal', component: JournalPage },
  { path: '/conference/:id', component: ConferenceDetailPage }, // 添加会议详情页面路由
  { path: '/journal/:id', component: JournalDetailPage }, // 添加期刊详情页面路由
  { path: '/account', component: AccountPage }, 
  { path: '/search', name: 'SearchResults', component: SearchResultsPage },
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
