from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired

class PowerpointForm(FlaskForm):
    title = StringField(label = "Titre",
                        validators = [InputRequired(message = "Veuillez donner un titre au PowerPoint")])
    subtitle = StringField(label = "Sous-titre")
    submit = SubmitField(label = "Créer le PowerPoint")