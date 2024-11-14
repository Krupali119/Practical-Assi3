$(document).ready(function() {
    let messages = []; // Array to store messages

    // Function to render messages
    const renderMessages = () => {
        const messagesContainer = $('#messages');
        messagesContainer.empty(); // Clear current messages
        messages.forEach(msg => {
            const messageElement = $('<div>').text(`${msg.username}: ${msg.message}`);
            messagesContainer.append(messageElement);
        });
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight); // Scroll to bottom
    };

    // Handle form submission
    $('#chatForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val().trim();
        const message = $('#message').val().trim();

        if (username && message) {
            // Store message in the array
            messages.push({ username: username, message: message });
            $('#message').val(''); // Clear the message input
            renderMessages(); // Render the updated messages
        }
    });
});
