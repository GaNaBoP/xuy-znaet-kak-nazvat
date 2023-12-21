from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///form.db'
db = SQLAlchemy(app)

app.app_context().push()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)

class Article(db.Model):
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    img = db.Column(db.String(1000))

class Comment(db.Model):
    __tablename__ = 'comment'
    commentId = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.String)
    text = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(150), nullable=False)

@app.route("/submit", methods=["POST", "GET"])
def submit():
  try:
    data = request.get_json()
    login = data['login']
    password = data['password']
    pw_hash = bcrypt.generate_password_hash(password)
    user = User(login=login, password=pw_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify(data)
  except KeyError as e:
    print(e)
    return jsonify({'error': 'Invalid request data'})
  
@app.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  login = data['login']
  password = data['password']
  user = User.query.filter_by(login=login).first()
  if user and bcrypt.check_password_hash(user.password, password):
    return jsonify({'message': 'User logged in successfully'})
  else:
    return jsonify({'message': 'Invalid credentials'})
  
@app.route("/addArticle", methods=["POST"])
def addArticle():
  try:
    data = request.get_json()
    title = data['title']
    description = data['description']
    img = data['img'] or None
    article = Article(title=title, description=description, img=img)
    db.session.add(article)
    db.session.commit()
    return jsonify(data)
  except KeyError as e:
    print(e)
    return jsonify({'error': 'Invalid request data'})
  
@app.route("/getArticle", methods=["GET"])
def getArticle():
  try: 
    articles = Article.query.all()
    records_json = [{'title': article.title, 'description': article.description, 'img': article.img, 'id': article.id} for article in articles]
    return jsonify(records_json)
  except KeyError as e:
    print(e)
    return jsonify({'error': 'Could not get the articles'})
  
@app.route("/getOneArticle/<int:id>", methods=["GET"])
def getOneArticle(id):
  article = Article.query.filter_by(id=id).first()
  if article:
    return jsonify({'img': article.img, 'title': article.title, 'description': article.description, 'id': article.id})
  else:
    return jsonify({'message': 'Article not found'})
  
@app.route("/addComment", methods=["POST"])
def addComment():
  try:
    data = request.get_json()
    id = data['id']
    text = data['text']
    author = data['author']
    comment = Comment(id=id, text=text, author=author)
    db.session.add(comment)
    db.session.commit()
    return jsonify(data)
  except KeyError as e:
    print(e)
    return jsonify({'error': 'Invalid request data'})

@app.route("/getComments/<int:id>", methods=["GET"])
def getComments(id):
  id = str(id)
  try: 
    comments = Comment.query.filter_by(id=id)
    records_json = [{'text': comment.text, 'id': comment.id, 'author': comment.author} for comment in comments]
    return jsonify(records_json)
  except KeyError as e:
    print(e)
    return jsonify({'error': 'Could not get the comments'})

if __name__ == "__main__":
  app.run(debug=True)