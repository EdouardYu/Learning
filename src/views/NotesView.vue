<script setup>
import { ref, nextTick } from "vue"

const showModal = ref(false)
const textarea = ref()
const newNote = ref("")
const errorMessage = ref("")
const notes = ref([])

function getUniqueId(notes) {
    if (notes.length > 0) {
        const notesIds = notes.map(note => note.id);
        const maxId = notesIds.reduce((a, b) => Math.max(a, b));
        const uniqueId = maxId + 1;
        return uniqueId;
    }
    return 1;
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 75%)`;
}

async function handleShowModal() {
    showModal.value = true;
    await nextTick();
    textarea.value.focus();
}

const addNote = () => {
    if (newNote.value.length < 10) {
        return errorMessage.value = "La note doit comporter au moins 10 caractères"
    }
    notes.value.push({
        id: getUniqueId(notes.value),
        text: newNote.value,
        color: getRandomColor(),
        date: new Date()
    })
    showModal.value = false;
    newNote.value = ""
}
</script>

<template>
    <div v-if="showModal" class="overlay">
        <div class="modal">
            <p @click="() => showModal = false">x</p>
            <textarea ref="textarea" v-model.trim="newNote" />
            <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
            <button @click="addNote">Add Note</button>
        </div>
    </div>
    <span>
        <button @click="handleShowModal">+</button>
    </span>
    <div class="container">
        <div class="cards-container">
            <div v-for="note in notes" :key="note.id" class="card" :style="{ backgroundColor: note.color }">
                <p class="main-text">{{ note.text }}</p>
                <p class="date">{{ note.date.toLocaleDateString("fr-FR") }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    max-width: 1040px;
    align-items: start;
    justify-content: start;
    padding: 20px 40px 0 20px;
}

h1 {
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 75px;
}

.card {
    width: 225px;
    height: 225px;
    background-color: #EDB62C;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
}

.main-text {
    line-height: 1.25;
    font-size: 17.5px;
    font-weight: bold;
}

.date {
    font-size: 12.5px;
    margin-top: auto;
}

span button {
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #141414;
    border-radius: 1000px;
    color: white;
    font-size: 20px;
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 5;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    overflow-wrap: break-word;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.modal {
    width: 750px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal button {
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
    background-color: blueviolet;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 15px;

}

.modal p {
    margin-left: auto;
    font-size: 20px;
    cursor: pointer;
}

textarea {
    width: 100%;
    height: 200px;
    padding: 5px;
    font-size: 20px;
    resize: none;
}

.modal .errorMessage {
    color: red;
}
</style>