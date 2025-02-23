<template>
    <div class="container">
        <div class="todo-wrapper">
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="01">
                <label for="01">完成季度工作报告并提交给上级</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="02">
                <label for="02">使用Ant Design+Element+Vue3+TS库完成一个桌面应用</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="03">
                <label for="03">安排与重要客户的电话会议，讨论合作细节</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="04">
                <label for="04">组织项目团队周会，总结进展并分配任务</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="05">
                <label for="05">支付本月的水电费和信用卡账单</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="06">
                <label for="06">计划下个月的旅行行程，预订机票和住宿</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="07">
                <label for="07">创建一个灵感板，收集创意和想法</label>
            </div>
            <div id="checklist">
                <input :checked="false" value="1" name="r" type="checkbox" id="08">
                <label for="08">参加社区的晨跑活动</label>
            </div>
        </div>
    </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: #429972;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.todo-wrapper {
    background: #fff;
    border-radius: 12px;
    height: 90%;
    width: 90%;
    overflow: hidden;
}

#checklist {
    --background: #ffffff;
    --text: #414856;
    --check: #429972;
    --disabled: #757575;
    --width: 60vw;
    --height: 10px;
    --border-radius: 10px;
    border-bottom: 2px solid #afafaf;
    margin: 10px 10px 10px 10px;
    background: var(--background);
    width: var(--width);
    height: var(--height);
    position: relative;
    padding: 30px 85px 30px 20px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

#checklist label {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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
    20%{
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