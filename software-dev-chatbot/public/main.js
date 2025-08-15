const chatLog   = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn   = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', e => e.key === 'Enter' && sendMessage());

function append(sender, text) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;  // autoscroll
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  append('user', text);
  userInput.value = '';
  fetch('/getChatbotResponse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage: text })
  })
    .then(r => r.json())
    .then(({ chatbotResponse }) => append('bot', chatbotResponse))
    .catch(() => append('bot', 'Error 😵'));
}
