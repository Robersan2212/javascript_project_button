from flask import flask
import sqlite3

def feedback_insertion(email, rating, feedback):
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
CREATE TABLE feedback
(email text, rating integer, feedback)
''')

conn.commit()
con.close()