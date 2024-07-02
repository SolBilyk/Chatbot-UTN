import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAw6NOs4rOHc9HjFd9iInnyYMC4NxdfGAg");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const button = document.getElementById("btn");
const historyList = document.getElementById("historyList");

button.addEventListener("click", sendMessage);
userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") {
        return;
    }
    const userBubble = createBubble(message, "user-bubble");
    chatContainer.appendChild(userBubble);
    addToHistory(message); // Agregar mensaje al historial
    userInput.value = "";
    generateResponse(message);
}

async function generateResponse(message) {
    const result = await model.generateContentStream(message);
    const response = await result.response;
    let text = await response.text();

    // Eliminar asteriscos del texto generado
    text = text.replace(/\*/g, '');

    const botBubble = createBubble(text, "chat-bubble");
    chatContainer.appendChild(botBubble);
    scrollToBottom();
}

function createBubble(text, className) {
    const bubble = document.createElement("div");
    bubble.className = className;
    bubble.textContent = text;
    return bubble;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addToHistory(message) {
    const historyItem = document.createElement("li");
    historyItem.textContent = message;
    historyList.appendChild(historyItem);
    historyItem.addEventListener("click", () => {
        userInput.value = historyItem.textContent;
        userInput.focus();
    });
}











