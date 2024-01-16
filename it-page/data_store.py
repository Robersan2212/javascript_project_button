from flask import Flask, request
import sqlite3

app = Flask(__name__)

@app.route('/feedback_insertion', methods=['POST'])
def feedback_insertion():
    data = request.get_json()
    email = data['email']
    rating = data['rating']
    feedback = data['feedback']
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute('''
    INSERT INTO feedback VALUES (?, ?, ?)
    ''',(email, rating, feedback))
    conn.commit()
    conn.close()

    conn = sqlite3.connect('feedback.db')

    c = conn.cursor()

    c.execute('''
    CREATE TABLE IF NOT EXISTS feedback
    (email text, rating integer, feedback text)
    ''')
    conn.commit()
    conn.close()
    return {'status': 'success'}, 200

if __name__ == '__main__':
    app.run(debug=True)