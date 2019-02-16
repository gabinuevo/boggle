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
    setInterval(async function(){
        if (timer>0){
        timer--;
        $('#timer').empty();
        $('#timer').html(timer);
        } else {
            $('#guess-input-form').hide();
            $('#timer-container').html("<b>GAMEOVER</b>");
            const response = await updateHighScore(score);
            $('#best-score-div').html('')
        }
    }, 1000)

    async function updateHighScore(score){
        return await $.post('/', {'score' : score});
    }
});