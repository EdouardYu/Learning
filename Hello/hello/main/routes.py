from flask import render_template, request, Blueprint
from hello.models import Post

main = Blueprint('main', __name__)

@main.route("/")
def hello():
    return render_template('hello.html', title = "Hello World!")

@main.route("/index")
@main.route("/accueil")
def index():
    page = request.args.get('page', 1, type = int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(per_page = 5, page = page)
    return render_template('index.html', posts = posts, title = "Accueil")