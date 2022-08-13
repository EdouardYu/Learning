from hello import app, db, bcrypt # du fichier __init__.py 
from flask import flash, redirect, render_template, url_for, request, abort
from hello.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
                        PostForm, RequestResetForm, ResetPasswordForm)
from hello.models import User, Post
# importation aprèsle db très important pour une importantion circulaire,
# mais autre particularité dans le fichier models.py
from flask_login import login_user, current_user, logout_user, login_required
from hello.utils import de, save_picture, send_reset_email

@app.route("/")
def hello():
    return render_template('hello.html', title = "Hello World!")

@app.route("/index")
@app.route("/accueil")
def index():
    page = request.args.get('page', 1, type = int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(per_page = 5, page = page)
    return render_template('index.html', posts = posts, title = "Accueil")

@app.route("/register", methods=['GET', 'POST'])
@app.route("/inscription", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username = form.username.data, email = form.email.data, password = hashed_password)
        db.session.add(user)
        db.session.commit()
        flash("Votre compte a été créé avec succès ! Vous pouvez à présent vous authentifier", "success")
        #enfaite ici on stock le message dans le caractère f, 'success correspond au catégorie du flash
        return redirect(url_for('login'))
    return render_template('register.html', title = "Inscription", form = form)

@app.route("/login", methods=['GET', 'POST'])
@app.route("/connexion", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email = form.email.data).first() 
        # Ici le first() permet de retourner un None si on ne trouve rien
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember = form.remember.data)
            flash(f"Bienvenue { current_user.username }", "success")
            # une lettre avant permet de signifier qu'il y a une variable dans le string
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('index'))
            #url_for() renvoie vers la fonction de la route
        flash("Le-mail ou/et le mot de passe de l'utilisateur est/sont inccorect(s)", "danger")
    return render_template('login.html', title = "Connexion", form = form)


@app.route("/logout")
@app.route("/déconnexion")
@app.route("/deconnexion")
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route("/account", methods=['GET', 'POST'])
@app.route("/profil", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data, current_user.profile_picture)
            current_user.profile_picture = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash("Vos modifications ont été prises en compte", "success")
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    profile_picture = url_for('static', filename = 'images/' + current_user.profile_picture)
    return render_template('account.html', title = "Profil", profile = profile_picture, form = form)

@app.route("/post/new", methods=['GET', 'POST'])
@app.route("/post/nouveau", methods=['GET', 'POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title = form.title.data, content = form.content.data, author = current_user)
        db.session.add(post)
        db.session.commit()
        flash("Votre post a bien été partagé", "success")
        return redirect(url_for('index'))
    return render_template('create_post.html', title = "Nouveau Post", form = form,
                        legend = "Nouveau Post", button_value = "Partager")


@app.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title = post.title, post = post)

@app.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@app.route("/post/<int:post_id>/modification", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403) # si l'auteur du post ne correspond pas à l'utilisateur actuel, on l'interdit le chemin
        # 403 : le client s’est authentifié mais ressource quand même interdite pour lui
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        flash("Votre post a bien été modifié", "success")
        return redirect(url_for('post', post_id = post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
    return render_template('create_post.html', title = "Modifier le Post", form = form,
                        legend = "Modifier le Post", button_value = "Modifier")

@app.route("/post/<int:post_id>/delete", methods=['POST'])
@app.route("/post/<int:post_id>/suppression", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash("Votre post a bien été supprimé", "success")
    return redirect(url_for('index'))

@app.route("/user/<string:username>")
@app.route("/utilisateur/<string:username>")
def user_posts(username):
    page = request.args.get('page', 1, type = int)
    user = User.query.filter_by(username = username).first_or_404()
    posts = Post.query.filter_by(author = user)\
        .order_by(Post.date_posted.desc())\
        .paginate(per_page = 5, page = page) #l'antislah permet de faire une coupure dans les fonctions
    return render_template('user_posts.html', posts = posts, user = user,
                        title = "Posts personnels", author = de(user.username))

@app.route("/reset_password", methods=['GET', 'POST'])
@app.route("/reinitialiser_le_mot_de_passe", methods=['GET', 'POST'])
@app.route("/réinitialiser_le_mot_de_passe", methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email = form.email.data).first()
        send_reset_email(user)
        flash("Un e-mail vous a été envoyé pour réinitialiser le mot de passe. Veuillez également vérifier vos spams", "info")
        return redirect(url_for('login'))
    return render_template('reset_request.html', title = "Réinitialiser le mot de passe", form = form)

@app.route("/reset_password/<token>", methods=['GET', 'POST'])
@app.route("/reinitialiser_le_mot_de_passe/<token>", methods=['GET', 'POST'])
@app.route("/réinitialiser_le_mot_de_passe/<token>", methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    user = User.verify_reset_token(token)
    if user is None:
        flash("Le jeton envoyé est invalide ou a expiré", "warning")
        return redirect(url_for('reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash("Votre mot de passe a bien été modifié ! Vous pouvez à présent vous authentifier", "success")
        return redirect(url_for('login'))
    return render_template('reset_token.html', title = "Réinitialiser le mot de passe", form = form)