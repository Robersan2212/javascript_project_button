from flask import Flask, request, send_file
import sqlite3
import pandas as pd

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
    CREATE TABLE IF NOT EXISTS feedback
    (email text, rating integer, feedback text)
    ''')

    c.execute('''
    INSERT INTO feedback VALUES (?, ?, ?)
    ''',(email, rating, feedback))

    conn.commit()
    conn.close()

    return {'status': 'success'}, 200

@app.route('/export', methods=['GET'])
def export_data():
    conn = sqlite3.connect('feedback.db')

    # Specify the path to your Excel file
    excel_file = 'it-pages/feedback_byui.xlsx'

    # Read the existing data from the Excel file into a DataFrame
    try:
        df_existing = pd.read_excel(excel_file)
    except FileNotFoundError:
        df_existing = pd.DataFrame()

    # Read the new data from the database into a DataFrame
    df_new = pd.read_sql_query("SELECT * from feedback", conn)

    # Append the new data to the existing data
    df = pd.concat([df_existing, df_new]).drop_duplicates()

    # Write the combined data back to the Excel file
    df.to_excel(excel_file, index=False)

    conn.close()

    return send_file(excel_file, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)