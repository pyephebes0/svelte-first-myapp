<script>
  let messages = [
    { sender: 'bot', text: 'สวัสดีครับ! ผมสามารถช่วยอะไรได้บ้าง?' }
  ];
  let userInput = '';

  function sendMessage() {
    if (userInput.trim()) {
      // ส่งข้อความจากผู้ใช้
      messages.push({ sender: 'user', text: userInput });

      // เคลียร์ช่องข้อความ
      userInput = '';

      // จำลองการตอบกลับจากระบบ
      setTimeout(() => {
        messages.push({ sender: 'bot', text: 'นี่คือคำตอบที่ฉันสามารถให้ได้!' });
      }, 1000);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as { sender, text }}
      <div class="message {sender}">
        <div class="message-bubble">{text}</div>
      </div>
    {/each}
  </div>

  <div class="input-container">
    <input
      type="text"
      bind:value={userInput}
      placeholder="พิมพ์ข้อความ..."
      on:keypress={handleKeyPress}
    />
    <button on:click={sendMessage}>ส่ง</button>
  </div>
</div>
