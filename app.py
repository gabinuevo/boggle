from boggle import Boggle
from flask import Flask, session, request, render_template, redirect, make_response
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "fuiserfobcai23618sdjahb"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()


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
    guess = request.form['guess']
    
