from hello import app
# on import l'app du fichier hello/__init__.py (ligne 4)


if __name__ == '__main__':
    app.run(debug=True)