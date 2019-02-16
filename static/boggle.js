$(function(){
    let score = 0;
    let timer = 60;
    // Event listener takes in input from guess field upon submission.
    // Returns servers response.
    $('#guess-input-form').on("submit", async function(evt){
        // console.log("Submit received!")
        evt.preventDefault();
        const input = $('#guess').val();
        const response = await sendToServer(input);
        // console.log(`What is the server response: ${response.result}`)
        $('#msg').empty();
        $('#msg').html(response.result);
        if (response.result==='ok') {
            updateScore(input);
        }
    });

    // Posts input to server. Returns response.
    async function sendToServer(input){
        return await $.post('/', {'guess' : input});
    };

    // Helper function to update score at ok word.
    function updateScore(word) {
        score += word.length;
        $('#score-div').empty();
        $('#score-div').html(`Score: ${score}`)
    }

    // timer that counts down from 60 seconds.
    setInterval(function(){
        timer--;
        $('#timer').empty();
        $('#timer').html(timer);
        if (!timer) {
            $('#guess-input-form').hide();
            $('#timer-container').html("<b>GAMEOVER</b>")
        }
    }
        , 1000)
});