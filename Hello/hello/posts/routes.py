from hello import db # du fichier __init__.py 
from flask import flash, redirect, render_template, url_for, request, abort, Blueprint
from hello.posts.forms import PostForm
from hello.models import Post
# importation après le db très important pour une importantion circulaire,
# mais autre particularité dans le fichier models.py
from flask_login import current_user, login_required

posts = Blueprint('posts', __name__)

@posts.route("/post/new", methods=['GET', 'POST'])
@posts.route("/post/nouveau", methods=['GET', 'POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title = form.title.data, content = form.content.data, author = current_user)
        db.session.add(post)
        db.session.commit()
        flash("Votre post a bien été partagé", "success")
        return redirect(url_for('main.index'))
    return render_template('create_post.html', title = "Nouveau Post", form = form,
                        legend = "Nouveau Post", button_value = "Partager")


@posts.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title = post.title, post = post)

@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@posts.route("/post/<int:post_id>/modification", methods=['GET', 'POST'])
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
        return redirect(url_for('posts.post', post_id = post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
    return render_template('create_post.html', title = "Modifier le Post", form = form,
                        legend = "Modifier le Post", button_value = "Modifier")

@posts.route("/post/<int:post_id>/delete", methods=['POST'])
@posts.route("/post/<int:post_id>/suppression", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash("Votre post a bien été supprimé", "success")
    return redirect(url_for('main.index'))