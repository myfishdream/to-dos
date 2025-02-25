import { createVNode, render, type App } from 'vue'
import MessageNotification from '../components/MessageNotification.vue'

let messageInstance: any = null

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageOptions {
  text: string
  type?: MessageType
  duration?: number
}

function createMessage() {
  if (messageInstance) return messageInstance

  const container = document.createElement('div')
  const vnode = createVNode(MessageNotification)
  render(vnode, container)
  document.body.appendChild(container)
  messageInstance = vnode.component?.exposed

  return messageInstance
}

export const message = {
  info(text: string, duration = 3000) {
    const instance = createMessage()
    instance?.add({ text, type: 'info', duration })
  },

  success(text: string, duration = 3000) {
    const instance = createMessage()
    instance?.add({ text, type: 'success', duration })
  },

  warning(text: string, duration = 3000) {
    const instance = createMessage()
    instance?.add({ text, type: 'warning', duration })
  },

  error(text: string, duration = 3000) {
    const instance = createMessage()
    instance?.add({ text, type: 'error', duration })
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$message = message
  }
} 