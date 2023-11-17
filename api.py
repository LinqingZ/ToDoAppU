import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from langchain.utilities import SQLDatabase
# from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain_experimental.sql import SQLDatabaseChain

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id}, {self.content}'
    

def todo_serializer(todo):
    return {
        "id": todo.id,
        'content': todo.content
    }

@app.route('/api', methods = ['GET'])  # don't need to put /api on it
def index(): 
    # todo = Todo.query.all() # can led to error if type Todo is not JSON serializiable
    return jsonify([*map(todo_serializer, Todo.query.all())]) # unpack object into array

@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    todo = Todo(content=request_data['content'])

    db.session.add(todo)
    db.session.commit()
    return {'201': 'todo created successfully'}

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])



@app.route('/api/ask', methods=['POST'])
def ask():
    db_uri = 'sqlite:///' + os.path.join(basedir, 'instance/example.db')
    db = SQLDatabase.from_uri(db_uri)
    llm = ChatOpenAI(temperature=0, verbose=True)
    db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)
    question = request.data.decode('utf-8')
    answer = db_chain.run(question)
    return answer
    # return {'202': 'Ai answered question successfully'}



if __name__ == '__main__':
    app.run(debug=True)