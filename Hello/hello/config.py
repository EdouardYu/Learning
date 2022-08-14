class Config:
    SECRET_KEY = 'bbc435f8e2abb4b2a46075f665efdfdd'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    MAIL_SERVER = "smtp.googlemail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "noreply.hello.flask@gmail.com"
    MAIL_PASSWORD = "nrdrfmnmmxdnbrux"