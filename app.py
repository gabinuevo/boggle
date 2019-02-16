from boggle import Boggle
from flask import Flask, session, request, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "fuiserfobcai23618sdjahb"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

# session['number_of_games_played'] = 0
# session['highest_score'] = 0

@app.route('/')
def show_board():
    """Shows board at root"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('submit_guess.html', board=board)


@app.route('/', methods=["POST"])
def show_server_response():
    """Take post request of word from client,
    determine if word is correct or invalid"""
    if request.form['guess']:
        guess = request.form['guess']
        board = session['board']
        response_str = boggle_game.check_valid_word(board, guess)
        response_to_client = {"result": response_str}
        return jsonify(response_to_client)
    elif request.form['score']:
        session['number_of_games_played'] += 1
        if request.form['score'] > session['highest_score']:
            session['highest_score'] = request.form['score']
        response_to_client = {'highest_score': session['highest_score']}
        return jsonify(response_to_client)

