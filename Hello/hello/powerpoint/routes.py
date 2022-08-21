from flask import flash, redirect, render_template, url_for, send_file, Blueprint
from hello.powerpoint.forms import PowerpointForm
from flask_login import login_required
from pptx import Presentation
from hello.powerpoint.pptx_function import title_slide

powerpoints = Blueprint('powerpoints', __name__)

@powerpoints.route("/powerpoint", methods=['GET', 'POST'])
@login_required
def powerpoint():
    form = PowerpointForm()
    if form.validate_on_submit():
        presentation = Presentation()
        title_slide(presentation = presentation, title = form.title.data, subtitle = form.subtitle.data)
        presentation.save("hello/powerpoint/hello.pptx")
        flash("Votre PowerPoint a bien été créé. Vous pouvez à présent le télécharger", "success")
        return redirect(url_for('powerpoints.download'))
    return render_template('powerpoint.html', title = "PowerPoint", form = form)

@powerpoints.route("/powerpoint/download")
@powerpoints.route("/powerpoint/télécharger")
@powerpoints.route("/powerpoint/telecharger")
@login_required
def download():
    return render_template('download.html', title = "Télécharger le PowerPoint")

@powerpoints.route("/powerpoint/download_powerpoint")
@powerpoints.route("/powerpoint/télécharger_powerpoint")
@powerpoints.route("/powerpoint/telecharger_powerpoint")
@login_required
def download_powerpoint():
    return send_file('powerpoint/hello.pptx', as_attachment = True)