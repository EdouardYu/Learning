from hello import db, login_manager, app
from flask_login import UserMixin
from datetime import datetime, timezone, timedelta
from jwt import encode, decode
# Permet de créer des tokens qui durent un certain temps

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), unique = True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    profile_picture = db.Column(db.String(20), nullable = False, default='python.png')
    password = db.Column(db.String(60), nullable = False)
    posts = db.relationship('Post', backref = 'author', lazy = True)
    # permet de dire qu'un utilisateur peut faire plusieurs posts et un post n'a qu'un auteur
    # backref cf.Notes/Flask,lazy = True permet de dire quand on l'appel pour la première fois,
    # on charge tout ses posts en même temps pour éviter de le rappeler, c'est un peu l'indexation
    # pour ses posts

    def get_reset_token(self, expiration_sec = 1800): # 1800sec = 30min
        reset_token = encode(
            {
                "user_id": self.id,
                "exp": datetime.now(tz = timezone.utc).astimezone(tz = None)
                        + timedelta( seconds = expiration_sec)
            },
            app.config['SECRET_KEY'],
            algorithm = "HS256"
        )
        return reset_token

    @staticmethod
    def verify_reset_token(token):
        try:
            user_id = decode(
                token,
                app.config['SECRET_KEY'],
                leeway = timedelta(seconds = 10),
                algorithms = ["HS256"]
            )['user_id'] # Pour ne prendre que l'user_id de l'information encodé
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{ self.username }', '{ self.email }', '{ self.profile_picture }')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    date_posted = db.Column(db.DateTime, nullable = False, default = datetime.today())
    content = db.Column(db.Text, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    # user fait référence au nom de la table/du colonne et non à la class User

    def __repr__(self):
        return f"Post('{ self.title }', '{ self.date_posted }')"