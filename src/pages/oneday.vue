<template>
    <div class="todo-page">
        <div class="todo-container">  
            <div class="add-list-fixed">
                <AddList />
            </div>
            <div class="todo-list-scroll">
                <todo 
                    v-for="item in list" 
                    :key="item.id" 
                    :id="item.id"
                    :title="item.title" 
                    :isChecked="item.isChecked"
                    :isStarred="item.isStarred"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import todo from '../components/todo.vue';
import AddList from '../components/AddList.vue';
import { useTodoListStore } from '../store/useTodoList';
import { storeToRefs } from 'pinia';

const store = useTodoListStore();
// store.$subscribe((mutation, state) => {
//     console.log(mutation, state);
// })

const { list } = storeToRefs(store);
console.log(list.value);

// 用于调试
store.$subscribe((mutation, state) => {
    console.log('Store updated:', mutation.type, state.list);
});
</script>

<style scoped>
.todo-page {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(100% - 280px); /* 调整右侧区域宽度 */
    margin-left: 260px; /* 确保与左侧菜单有足够间距 */
    background-color: #429972;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
}

.todo-container {
    background: #fff;
    border-radius: 12px;
    height: 100%;
    width: 100%;
    max-width: 900px; /* 调整最大宽度 */
    margin: 0 auto; /* 居中显示 */
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-list-fixed {
    background: #fff;
    border-bottom: 1px solid #eee;
    border-radius: 12px 12px 0 0;
}

.todo-list-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 0;
}

/* 自定义滚动条样式 */
.todo-list-scroll::-webkit-scrollbar {
    width: 6px;
}

.todo-list-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.todo-list-scroll::-webkit-scrollbar-thumb {
    background: #1078d8;
    border-radius: 3px;
}

.todo-list-scroll::-webkit-scrollbar-thumb:hover {
    background: #36a7db;
}
</style>