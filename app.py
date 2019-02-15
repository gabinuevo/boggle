from boggle import Boggle
from flask import Flask, session, request, render_template, redirect, make_response
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "fuiserfobcai23618sdjahb"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()


