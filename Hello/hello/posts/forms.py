from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import InputRequired

class PostForm(FlaskForm):
    title = StringField(label = "Titre", validators = [InputRequired(message = "Veuillez mettre un titre")])
    content = TextAreaField(label = "Contenu", validators = [InputRequired(message = "Veuillez mettre votre message")])