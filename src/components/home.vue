<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

interface NavItem {
  id: number
  icon: string
  name: string
  count?: number
}

const navItems = ref<NavItem[]>([
  { id: 1, icon: '☀️', name: '我的一天', count: 5 },
  { id: 2, icon: '⭐', name: '重要' },
  { id: 3, icon: '📅', name: '计划内' },
  { id: 4, icon: '∞', name: '全部', count: 15 },
  { id: 5, icon: '👤', name: '已分配给我' },
  { id: 6, icon: '🏴', name: '标记的电子邮件' },
  { id: 7, icon: '🏠', name: '任务', count: 5 },
  { id: 8, icon: '📋', name: '计划', count: 10 }
])

const activeNavId = ref(1)

const selectNav = (id: number) => {
  activeNavId.value = id
  // console.log(activeNavId.value);
  switch (id) {
    case 1:
      router.push({
        name: 'oneday',
        query: {
          text: "你好"
        }
      })
      break;
    case 2:
      router.push({
        name: 'important',
        query: {
          text: "你好"
        }
      })
      break;
    case 3:
      router.push({
        name: 'plan',
        query: {
          text: "你好"
        }
      })
      break;
    case 4:
      router.push({
        name: 'all',
        query: {
          text: "你好"
        }
      })
      break;
    case 5:
      console.log(5);
      break;
    case 6:
      console.log(6);
      break;
    case 7:
      console.log(7);
      break;
    case 8:
      console.log(8);
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="search-box">
        <input type="text" placeholder="搜索" />
      </div>

      <nav class="nav-list">
        <div v-for="item in navItems" :key="item.id" class="nav-item" :class="{ active: activeNavId === item.id }"
          @click="selectNav(item.id)">
          <div class="nav-content">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-name">{{ item.name }}</span>
          </div>
          <span v-if="item.count" class="nav-count">{{ item.count }}</span>
        </div>
      </nav>

    </div>
    <div class="content">
      
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;

}
.content{
  /* border: 1px solid red; */
  flex-grow: 1;
  /* overflow: scroll; */
}
.sidebar {
  
  width: 280px;
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

.search-box {
  padding: 0 12px;
  margin-bottom: 12px;
  margin-bottom: 10px;
  padding-top: 10px;

}

.search-box input {
  width: 90%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

.search-box input:focus {
  border-color: #0078d4;
}

.nav-list {
  display: flex;
  flex-direction: column;
    min-width: 200px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;

}

.nav-item:hover {
  background-color: #e8e8e8;
}

.nav-item.active {
  background-color: #e1e1e1;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
}

.nav-name {
  font-size: 14px;
  color: #333;
}

.nav-count {
  font-size: 12px;
  color: #666;
  background-color: transparent;
}

.nav-item:hover .nav-count {
  color: #333;
}
</style>