<template>
    <div class="add-todo">
        <input 
            type="text" 
            v-model="title" 
            placeholder="请输入待办事项..."
            @keyup.enter="handleAdd"
        />
        <button @click="handleAdd">添加</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoListStore } from '../store/useTodoList'

const store = useTodoListStore()
const title = ref('')

const handleAdd = () => {
    if (!title.value.trim()) {
        return
    }
    store.addTodo(title.value.trim())
    title.value = ''
}
</script>

<style scoped>
.add-todo {
    padding: 20px;
    display: flex;
    gap: 10px;
    background: #fff;
}

.add-todo input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;
    outline: none;
}

.add-todo input:focus {
    border-color: #429972;
}

.add-todo input::placeholder {
    color: #a8abb2;
}

.add-todo button {
    padding: 8px 20px;
    background-color: #429972;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.add-todo button:hover {
    background-color: #357e5c;
}

.add-todo button:active {
    background-color: #2d6b4e;
}
</style>
