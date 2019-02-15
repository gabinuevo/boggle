$(function(){
    // Event listener takes in input from guess field upon submission.
    // Returns servers response.
    $('#guess-input-form').on("submit", async function(evt){
        console.log("Submit received!")
        evt.preventDefault();
        const input = $('#guess').val();
        const response = await sendToServer(input);
        return response;
    });

    // Posts input to server. Returns response.
    async function sendToServer(input){
        return await $.post('/');
    };
});