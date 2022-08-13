import os
import secrets
from PIL import Image
from hello import app, mail
from flask import url_for
from flask_mail import Message

def de(name):
    de = "d'" + name if name[0] in "AEIOUYaeiouyHhÉÀÈÙÂÊÎÔÛËÏéàèùâêîôûëï" else "de " + name
    return de

def save_picture(form_picture, current_user_picture):
    # on ne veut pas conserver le nom du fichier téléchargé par l'utilisateur 
    # car il peut rentrer en collision avec un autre fichier qui porte le même nom existant
    # dans notre dossier coté serveur
    random_hex = secrets.token_hex(8)
    # on randomise le nom du fichier en hexa
    _, file_extension = os.path.splitext(form_picture.filename) 
    # filename permet de convertir le string du formsfield en nom de de fichier
    # la ligne permet de séparer le nom du fichier avec l'extension du fichier
    # pour jeter une variable, en python on l'enregistre sur l'underscore _
    picture_filename = random_hex + file_extension 
    picture_path = os.path.join(app.root_path, 'static/images', picture_filename)
    # permet d'enregistrer le fichier dans le dossier static/images à partir de la racine
    # (voir ligne plus bas avec save)
    profile_picture = Image.open(form_picture)
    if profile_picture.width > profile_picture.height:
        (left, upper, right, lower) = (0, 0, profile_picture.height, profile_picture.height)
        profile_picture = profile_picture.crop((left, upper, right, lower))
    elif profile_picture.width < profile_picture.height:
        (left, upper, right, lower) = (0, 0, profile_picture.width, profile_picture.width)
        profile_picture = profile_picture.crop((left, upper, right, lower))
    output_size = (125, 125)
    profile_picture.thumbnail(output_size)
    profile_picture.save(picture_path)
    # on supprime l'ancien photo de profil si possible:
    current_user_picture_path = os.path.join(app.root_path, 'static/images', current_user_picture)
    if current_user_picture != "python.png" and os.path.exists(current_user_picture_path):
        os.remove(current_user_picture_path)
    return picture_filename

def send_reset_email(user):
    token = user.get_reset_token()
    message = Message("Demande de réinitialisation du mot de passe",
            sender = "noreply.hello.flask@gmail.com", recipients = [user.email])
    message.body = f'''Pour réinitialiser votre mot de passe, veuillez cliqué sur le lien ci-dessous :

{ url_for('reset_token', token = token, _external = True) } 

Ce lien est valide pendant 30 minutes après reception de l'e-mail
Si vous n'êtes pas à l'origine de la demande, veuillez ignorer cet e-mail
'''
#_external = True permet d'avoir un lien absolu au lieu d'un lien relatif
    mail.send(message)