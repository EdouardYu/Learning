from hello import create_app
# on importe la fonction create_app du fichier hello/__init__.py

app = create_app()

if __name__ == '__main__':
    app.run(debug = True)