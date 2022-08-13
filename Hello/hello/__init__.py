from pickle import TRUE
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bbc435f8e2abb4b2a46075f665efdfdd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login' 
login_manager.login_message_category = 'info' # agit comme le block de success ou danger de Bootstrap
login_manager.login_message = "Veuillez vous identifier pour accéder à cette page"
# permet de relier au login_required et de rediriger les login_required vers la page de login
app.config['MAIL_SERVER'] = "smtp.googlemail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "noreply.hello.flask@gmail.com"
app.config['MAIL_PASSWORD'] = "nrdrfmnmmxdnbrux"
mail = Mail(app)

from hello import routes