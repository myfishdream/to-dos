<template>
    <div id="checklist">
        <input :checked="props.isChecked" :value="props.id" name="r" type="checkbox" :id="props.id" @change="handleChange">
        <label :for="props.id">{{ props.title }}</label>
        <button 
            class="star-btn" 
            :class="{ 'is-starred': props.isStarred }"
            @click="handleStar"
            type="button"
        >
            <svg class="icon" viewBox="0 0 1092 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M545.978336 0l163.812875 343.900478 382.213898 47.37108-280.932785 259.765952 72.412847 372.96249-337.458398-183.139114-337.458399 182.848494 72.412847-372.96249L0 391.029374 382.213897 343.900478z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoListStore } from '../store/useTodoList';

const store = useTodoListStore();

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        required: true
    },
    isStarred: {
        type: Boolean,
        required: true
    }
})

const handleChange = () => {
    store.toggleTodo(props.id);
}

const handleStar = () => {
    store.toggleStar(props.id);
}
</script>

<style scoped>
#checklist {
    /* border: 1px solid #afafaf; */
    --background: #ffffff;
    --text: #414856;
    --check: #429972;
    --disabled: #757575;
    --star-default: #d9d9d9;
    --star-active: #E2CA52;
    --width: 50vw;
    --height: 10px;
    --border-radius: 10px;
    border-bottom: 2px solid #afafaf;
    margin: 10px 10px 10px 25px;
    background: var(--background);
    width: var(--width);
    height: var(--height);
    position: relative;
    padding: 30px 85px 30px 20px;
    display: grid;
    grid-template-columns: 30px 1fr 50px;
    align-items: center;
    gap: 10px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.star-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
}

.star-btn:hover {
    opacity: 0.8;
    transform: translateY(-50%) scale(1.1);
}

.star-btn:active {
    transform: translateY(-50%) scale(0.9);
}

.star-btn .icon {
    width: 100%;
    height: 100%;
    fill: var(--star-active);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
}

.star-btn.is-starred {
    opacity: 1;
}

.star-btn.is-starred .icon {
    animation: star-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes star-pop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

#checklist label {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: color 0.3s ease;
    margin-left: 20px;
}

#checklist label::before,
#checklist label::after {
    content: "";
    position: absolute;
    left: -36px !important;
}

#checklist label::before {
    opacity: 0;
    height: 2px;
    width: 8px;
    left: -5px !important;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
}

#checklist input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 30px;
    width: 30px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    background: var(--background);
    display: grid;
    align-items: center;
    margin-right: 20px;
    border: 1px solid #afafaf;

}

#checklist input[type="checkbox"]::before,
#checklist input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
}

#checklist input[type="checkbox"]::before {
    width: 0px;
    right: 78%;
    top: 10px !important;
    transform-origin: right bottom;
}

#checklist input[type="checkbox"]::after {
    width: 0px;
    left: 45%;
    top: 20px !important;
    transform-origin: left bottom;
}

#checklist input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
}

#checklist input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards 0.1s;
}

#checklist input[type="checkbox"]:checked+label {
    color: var(--disabled);
    animation: move 0.3s ease 0.1s forwards;
}

#checklist input[type="checkbox"]:checked+label::before {
    background: var(--disabled);
    animation: slice 1s ease forwards;
}

@keyframes move {
    50% {
        padding-left: 8px;
        padding-right: 0px;
    }

    100% {
        padding-right: 4px;
    }
}

@keyframes slice {
    0% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    50% {
        opacity: 1;
        width: 100%;
        left: 4px;
    }

    100% {
        opacity: 1;
        width: 100%;
        left: -2px;
        padding-left: 0;
    }
}

@keyframes check-01 {
    0% {
        opacity: 0;
        width: 0px;
        top: auto;
        transform: rotate(0) rotate(180deg);
    }

    50% {
        opacity: 0.25;
        width: 0px;
        top: auto;
        transform: rotate(0) rotate(180deg);
    }

    51% {
        opacity: 0.5;
        width: 0px;
        top: 8px;
        transform: rotate(45deg) rotate(180deg);
    }

    100% {
        opacity: 1;
        width: 10px;
        top: 8px;
        transform: rotate(45deg) rotate(180deg);
    }
}

@keyframes check-02 {
    0% {
        opacity: 0;
        width: 4px;
        top: auto;
        transform: rotate(0);
    }

    50% {
        opacity: 0.25;
        width: 0px;
        top: auto;
        transform: rotate(0);
    }

    51% {
        opacity: 0.5;
        width: 0px;
        top: 8px;
        transform: rotate(-45deg);
    }

    100% {
        opacity: 1;
        width: 35px;
        top: 8px;
        transform: rotate(-45deg);
    }
}
</style>
