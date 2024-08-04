// Your Watson Assistant credentials
const ASSISTANT_ID = 'your-assistant-id';
const API_KEY = 'your-api-key';
const URL = 'your-service-url';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessageToChat('You', userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch(`${URL}/v2/assistants/${ASSISTANT_ID}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        }
    });

    const session = await response.json();
    const sessionId = session.session_id;

    const messageResponse = await fetch(`${URL}/v2/assistants/${ASSISTANT_ID}/sessions/${sessionId}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            input: {
                message_type: 'text',
                text: userInput
            }
        })
    });

    const messageData = await messageResponse.json();
    const botResponse = messageData.output.generic[0].text;

    addMessageToChat('Bot', botResponse);
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButton = document.getElementById('learn-more-btn');

    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            scrollToSection('#about'); // Replace with the ID of the section you want to scroll to
        });
    }

    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbot-btn');

    if (chatbotButton) {
        chatbotButton.addEventListener('click', function() {
            // Replace with code to open the chatbot (e.g., trigger chatbot API)
            window.watsonAssistantChatOptions.openChat();
        });
    }
});




