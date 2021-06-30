<template>
    <div class="asacoco-board">
        <div class="board-title-container" v-if="boardTitle">
            <div class="ribbon" >
                <div>{{boardTitle}}</div>
                <div v-if="boardTitleJP">{{boardTitleJP}}
            </div></div>
        </div>
        <div class="board-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AsacocoBoard',
  props: {
    boardTitle: String,
    boardTitleJP: String
  }
}
</script>

<style scoped>
.asacoco-board {
    background-color: rgb(255, 255, 255, 0.8);
}

.board-content {
    padding: 20px;
    font-family: "Kosugi Maru";
}

.board-title-container {
    margin-bottom: 5px;
}

.ribbon {
    color:white;
    background-color: #B43E25;
    font-size: 2rem;
    /* max-width: 200px; */
    font-family: "Noto Sans JP";
    font-weight: bolder;
    padding: 10px;
    margin-left: 1rem;
    display: inline-flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
}

</style>
