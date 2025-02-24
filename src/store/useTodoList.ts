// 引入defineStore用于创建store
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

// 定义标签接口
interface TodoTag {
  id: string
  name: string
  color: string
}

// 定义并暴露一个store
interface Todo {
  id: string
  title: string
  isChecked: boolean
  isStarred: boolean
  createTime: string // ISO 格式的时间字符串
  dueTime?: string  // 可选的到期时间
  note?: string     // 可选的备注
  tags: TodoTag[]   // 标签数组
}

// 示例数据
const exampleTodos: Todo[] = [{
  id: nanoid(),
  title: '完成季度工作报告并提交给上级',  
  isChecked: false,
  isStarred: true,
  createTime: '2024-03-20T08:00:00.000Z',
  dueTime: '2024-03-31T23:59:59.999Z',
  note: '需要包含Q1的所有项目进度',
  tags: [{
    id: nanoid(),
    name: '工作',
    color: '#ff4d4f'
  }]
}, {
  id: nanoid(),
  title: '使用Ant Design+Element+Vue3+TS库完成一个桌面应用',
  isChecked: false,
  isStarred: false,
  createTime: '2024-03-20T09:00:00.000Z',
  dueTime: '2024-04-15T23:59:59.999Z',
  note: '需要学习 Electron 相关知识',
  tags: [{
    id: nanoid(),
    name: '学习',
    color: '#1890ff'
  }, {
    id: nanoid(),
    name: '项目',
    color: '#52c41a'
  }]
}]

export const useTodoListStore = defineStore('TodoList', {
  state: () => ({
    list: exampleTodos
  }),
  actions: {
    addTodo(title: string) {
      const todo: Todo = {
        id: nanoid(),
        title,
        isChecked: false,
        isStarred: false,
        createTime: new Date().toISOString(),
        tags: []
      }
      this.list.unshift(todo)
    },
    toggleTodo(id: string) {
      const todo = this.list.find(item => item.id === id)
      if (todo) {
        todo.isChecked = !todo.isChecked
      }
    },
    toggleStar(id: string) {
      const todo = this.list.find(item => item.id === id)
      if (todo) {
        // 切换星标状态
        todo.isStarred = !todo.isStarred
        
        // 重新排序：星标项排在前面
        const starredItems = this.list.filter(item => item.isStarred)
        const unstarredItems = this.list.filter(item => !item.isStarred)
        this.list = [...starredItems, ...unstarredItems]
      }
    },
    updateTodoNote(id: string, note: string) {
      const todo = this.list.find(item => item.id === id)
      if (todo) {
        todo.note = note
      }
    },
    updateTodoDueTime(id: string, dueTime: string) {
      const todo = this.list.find(item => item.id === id)
      if (todo) {
        todo.dueTime = dueTime
      }
    },
    addTodoTag(id: string, tagName: string, tagColor: string) {
      const todo = this.list.find(item => item.id === id)
      if (todo) {
        todo.tags.push({
          id: nanoid(),
          name: tagName,
          color: tagColor
        })
      }
    },
    removeTodoTag(todoId: string, tagId: string) {
      const todo = this.list.find(item => item.id === todoId)
      if (todo) {
        todo.tags = todo.tags.filter(tag => tag.id !== tagId)
      }
    }
  }
})