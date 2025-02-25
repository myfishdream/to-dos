<template>
  <div class="message-container">
    <TransitionGroup 
      name="message-fade" 
      tag="div"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message-wrapper"
        :style="{
          transform: `translate(-50%, ${msg.offset}px)`,
          height: msg.height + 'px'
        }"
      >
        <div :class="['message', msg.type]">
          <div class="message-content">
            <span class="message-icon" :class="msg.type">
              <svg v-if="msg.type === 'info'" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="currentColor"/>
              </svg>
              <svg v-if="msg.type === 'success'" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292c-12.7 17.7-39 17.7-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" fill="currentColor"/>
              </svg>
              <svg v-if="msg.type === 'warning'" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="currentColor"/>
              </svg>
              <svg v-if="msg.type === 'error'" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" fill="currentColor"/>
              </svg>
            </span>
            <span class="message-text">{{ msg.text }}</span>
            <button class="close-btn" @click="remove(msg.id)">
              <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="message-progress" :style="{ animationDuration: `${msg.duration}ms` }" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
  id: string
  text: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration: number
  offset: number
  height: number
}

const messages = ref<Message[]>([])
const messageGap = 16
const baseOffset = 20

const updatePositions = () => {
  let currentOffset = baseOffset
  messages.value.forEach(msg => {
    msg.offset = currentOffset
    currentOffset += msg.height + messageGap
  })
}

const getLastOffset = () => {
  if (messages.value.length === 0) return baseOffset
  const lastMessage = messages.value[messages.value.length - 1]
  return lastMessage.offset
}

const add = async (message: Omit<Message, 'offset' | 'id' | 'height'>) => {
  const id = `${Date.now()}-${messages.value.length}`
  const isFirstMessage = messages.value.length === 0
  
  // 第一个消息从顶部-20px的位置开始（为了有下滑动画）
  const initialOffset = isFirstMessage 
    ? baseOffset - 100  // 第一个消息从稍微上面的位置开始
    : getLastOffset()  // 后续消息从上一个位置开始
  
  messages.value.push({
    ...message,
    id,
    offset: initialOffset,
    height: 60
  })

  await nextTick()
  
  const messageElement = document.querySelector(`[data-message-id="${id}"]`)
  if (messageElement) {
    const height = messageElement.getBoundingClientRect().height
    const index = messages.value.findIndex(msg => msg.id === id)
    if (index !== -1) {
      messages.value[index].height = height
    }
  }
  
  // 使用 nextTick 确保初始位置已经应用
  await nextTick()
  // 更新到最终位置
  updatePositions()

  setTimeout(() => {
    remove(id)
  }, message.duration)
}

const remove = (id: string) => {
  const index = messages.value.findIndex(msg => msg.id === id)
  if (index !== -1) {
    messages.value.splice(index, 1)
    nextTick(() => {
      updatePositions()
    })
  }
}

const onBeforeLeave = (el: Element) => {
  const style = (el as HTMLElement).style
  const height = el.getBoundingClientRect().height
  style.height = `${height}px`
  style.maxHeight = `${height}px`
  style.opacity = '0'
  style.transform = 'translate(-50%, -20px)'
  style.transition = 'all 0.3s ease-in-out'
}

const onAfterLeave = () => {
  updatePositions()
}

defineExpose({
  add
})
</script>

<style scoped>
.message-container {
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 9999;
  pointer-events: none;
  width: min(380px, calc(100vw - 32px)); /* 设置最大宽度，并确保在小屏幕上有边距 */
}

.message-wrapper {
  position: fixed;
  left: 50%;
  width: 100%;
  pointer-events: none;
  transition: transform 0.3s ease-in-out;
}

.message {
  position: relative;
  width: fit-content; /* 根据内容自适应宽度 */
  min-width: 280px; /* 设置最小宽度 */
  max-width: 100%; /* 不超过容器宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 14px 26px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: all;
  box-sizing: border-box; /* 确保padding计入宽度 */
}

.message-content {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: pre-wrap; /* 允许文本换行 */
  word-break: break-word; /* 长单词换行 */
}

.message-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.message-text {
  flex: 1;
  min-width: 0; /* 防止文本溢出 */
  font-size: 14px;
  line-height: 1.5;
  padding-right: 24px; /* 为关闭按钮留出空间 */
}

.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

.info {
  color: #1890ff;
}

.success {
  color: #52c41a;
}

.warning {
  color: #faad14;
}

.error {
  color: #ff4d4f;
}

.message.info {
  background: #e6f4ff;
  border: 1px solid #91caff;
}

.message.success {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.message.warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
}

.message.error {
  background: #fff2f0;
  border: 1px solid #ffccc7;
}

.message-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform-origin: left;
  animation: progress linear forwards;
  background: rgba(0, 0, 0, 0.2);
  will-change: transform;
}

@keyframes progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.message-wrapper {
  transition: transform 0.3s ease-in-out;
}

.message-fade-move {
  transition: transform 0.3s ease-in-out;
}
</style> 