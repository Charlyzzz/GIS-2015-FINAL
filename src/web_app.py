from cgi import escape

from bottle import static_file, run, get
from bson.json_util import dumps
from mako.lookup import TemplateLookup

from edts import closest_edt, list_edts


@get('/')
@get('/localizar')
def index():
    return template('index.html')


# @get('/administrar')
# def index():
#     return template('abm.html')


@get('/closest_edt/<latitud>/<longitud>')
def get_closest_edt(latitud, longitud):
    return to_json_response(closest_edt(latitud, longitud))


@get('/edts/<params>')
def get_edts_list(params):
    return to_json_response(list_edts(params))


# @post('/edt')
# def update_or_insert():
#     edt = request.json
#     update_or_insert_edt(edt)
#
#
# @post('/edt/delete')
# def delete_edt():
#     edt = request.json
#     remove_edt(edt)


# region wrappers de requests

def to_json_response(object, *args, **kwargs):
    return escape(dumps(object, args, kwargs))


def template(templatename, **kwargs):
    mytemplate = mylookup.get_template(templatename)
    return mytemplate.render(**kwargs)


mylookup = TemplateLookup(directories=['./static'], output_encoding='utf-8', )


@get('/static/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./static/')


@get('/node_modules/angular/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/angular')


@get('/node_modules/angular-google-maps/dist/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/angular-google-maps/dist/')


@get('/node_modules/angular-simple-logger/dist/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/angular-simple-logger/dist/')


@get('/node_modules/lodash/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/lodash/')


@get('/node_modules/bootstrap/dist/css/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/bootstrap/dist/css/')


@get('/node_modules/angular-ui-bootstrap/<filename>')
def serve_static_files(filename):
    return static_file(filename, root='./node_modules/angular-ui-bootstrap/')


# endregion

run(host='45.55.90.189', reloader=True)
