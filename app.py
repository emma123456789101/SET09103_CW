from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/quiz-process', methods=['POST'])
def quiz_process():
    answer1 = request.form['question1']

    if answer1 == "correct option":
        return "You are correct!"
    else:
        return "Sorry, the correct answer is: " + correctOption