@app.route('/submit', methods=['POST'])
def submit_quiz():
    q1_answer = request.form['q1']
    # Retrieve answers for other questions in a similar way
    # Process and evaluate the answers here