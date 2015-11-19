from bottle import run, route, template


@route('/')
def index():
    return template('index')


run(reloader=True)
