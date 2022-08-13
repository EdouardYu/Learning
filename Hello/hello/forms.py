from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import StringField, EmailField, PasswordField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, Length, Email, EqualTo, ValidationError
from hello.models import User

class UsernameChecker(object):
    def __init__(self, message = "Un utilisateur possède déjà ce pseudo"):
        self.message = message

    def __call__(self, form, field):
        if current_user.is_authenticated:
            if field.data != current_user.username: 
                user = User.query.filter_by(username = field.data).first()
                if user:
                    raise ValidationError(self.message)
        else:
            user = User.query.filter_by(username = field.data).first()
            if user:
                raise ValidationError(self.message)


class EmailChecker(object):
    def __init__(self, message = "Cet e-mail est déjà associé à un autre compte"):
        self.message = message

    def __call__(self, form, field):
        if current_user.is_authenticated:
            if field.data != current_user.email: 
                user = User.query.filter_by(email = field.data).first()
                if user:
                    raise ValidationError(self.message)
        else: 
            user = User.query.filter_by(email = field.data).first()
            if user:
                raise ValidationError(self.message)

class RequestResetChecker(object):
    def __init__(self, message = "Aucun utilisateur n'utilise cet e-mail. Vous devez vous inscrire d'abord"):
        self.message = message

    def __call__(self, form, field):
        user = User.query.filter_by(email = field.data).first()
        if user is None:
            raise ValidationError(self.message)

class PasswordValidator(object):
    def __init__(self, message = None, special_characters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"):
        self.special_characters = special_characters
        if not message:
            message = u'''Le mot de passe doit contenir au moins une Majuscule, une minuscule,
                    un chiffre et un caractère spécial : ''' + " ".join(list(special_characters))
        self.message = message

    def __call__(self, form, field):
        lower = False
        upper = False
        special = False
        number = False
        lowercase = "abcdefghijklmnopqrstuvwxyzéàèùâêîôûëï"
        uppercase = lowercase.upper()
        for char in field.data:
            if char in lowercase:
                lower = True
                break
        for char in field.data:  
            if char in uppercase:
                upper = True
                break
        for char in field.data:
            if char in self.special_characters:
                special = True
                break
        for char in field.data:
            if char in "0123456789":
                number = True
                break
        if lower == False or upper == False or special == False or number == False:
            raise ValidationError(self.message)

allowed_format = ['jpg', 'jpeg', 'png']

class RegistrationForm(FlaskForm):
    username = StringField(label = "Pseudo",
                        validators = [InputRequired(message = "Veuillez saisir un pseudo"),
                        Length(min = 2,max = 20, message = "Le pseudo doit contenir 2 à 20 caractères"),
                        UsernameChecker()])
    email = EmailField(label = "E-mail",
                        validators = [InputRequired(message="Veuillez renseigner un adresse e-mail"),
                        Email(message = "Veuillez renseigner un adresse e-mail valide", check_deliverability = True),
                        EmailChecker()])
    password = PasswordField(label = "Mot de passe",
                            validators = [InputRequired(message = "Veuillez saisir un mot de passe"),
                            Length(min = 8, max = 20, message = "Le mot de passe doit contenir 8 à 20 caractères"),
                            PasswordValidator()])
    confirm_password = PasswordField(label = "Confirmer le mot de passe", 
                                    validators = [InputRequired(message = "Veuillez confirmer le mot de passe"),
                                    EqualTo(fieldname = 'password', message = "Les deux mots de passe sont différents")])
    submit = SubmitField(label = "S'inscrire")
    
class LoginForm(FlaskForm):
    email = EmailField(label = "E-mail", validators = [InputRequired(message="Veuillez renseigner votre adresse e-mail"),
                                        Email(message = "Veuillez renseigner un adresse e-mail valide", check_deliverability = True)])
    password = PasswordField(label = "Mot de passe", validators = [InputRequired(message = "Veuillez saisir votre mot de passe")])
    remember = BooleanField(label = "Se souvenir de moi")
    submit = SubmitField(label = "S'authentifier")
    
class UpdateAccountForm(FlaskForm):
    username = StringField(label = "Pseudo",
                        validators = [InputRequired(message = "Veuillez saisir un pseudo"),
                        Length(min = 2,max = 20, message = "Le pseudo doit contenir 2 à 20 caractères"),
                        UsernameChecker()])
    email = EmailField(label = "E-mail",
                        validators = [InputRequired(message="Veuillez renseigner un adresse e-mail"),
                        Email(message = "Veuillez renseigner un adresse e-mail valide", check_deliverability = True),
                        EmailChecker()])
    picture = FileField(label = "Photo de profil",
                        validators = [FileAllowed(upload_set = allowed_format,
                        message = "Seuls les fichiers avec les extensions : {} sont autorisés".format(", ".join(allowed_format)))])
    submit = SubmitField(label = "Modifier")

class PostForm(FlaskForm):
    title = StringField(label = "Titre", validators = [InputRequired(message = "Veuillez mettre un titre")])
    content = TextAreaField(label = "Contenu", validators = [InputRequired(message = "Veuillez mettre votre message")])

    
class RequestResetForm(FlaskForm):
    email = EmailField(label = "E-mail",
                        validators = [InputRequired(message="Veuillez renseigner un adresse e-mail"),
                        Email(message = "Veuillez renseigner un adresse e-mail valide", check_deliverability = True),
                        RequestResetChecker()])
    submit = SubmitField(label = "Envoyer")

class ResetPasswordForm(FlaskForm):
    password = PasswordField(label = "Nouveau mot de passe",
                            validators = [InputRequired(message = "Veuillez saisir un mot de passe"),
                            Length(min = 8, max = 20, message = "Le mot de passe doit contenir 8 à 20 caractères"),
                            PasswordValidator()])
    confirm_password = PasswordField(label = "Confirmer le nouveau mot de passe", 
                                    validators = [InputRequired(message = "Veuillez confirmer le mot de passe"),
                                    EqualTo(fieldname = 'password', message = "Les deux mots de passe sont différents")])
    submit = SubmitField(label = "Réinitialiser le mot de passe")