from bottle import static_file, run, get
from bson.json_util import dumps
from mako.lookup import TemplateLookup

from edts import closest_edt, list_edts


@get('/')
def index():
    return template('index.html')


@get('/closest_edt/<latitud>/<longitud>')
def get_closest_edt(latitud, longitud):
    return to_json_response(closest_edt(float(latitud), float(longitud)))


@get('/edts')
def get_edts_list():
    return to_json_response(list_edts())


# region wrappers de requests

def to_json_response(object, *args, **kwargs):
    return dumps(object, args, kwargs)


def template(templatename, **kwargs):
    mytemplate = mylookup.get_template(templatename)
    return mytemplate.render(**kwargs)


mylookup = TemplateLookup(directories=['./static'], output_encoding='utf-8', )


@get('/static/<filename>')
def send_static(filename):
    return static_file(filename, root='./static/')


@get('/node_modules/angular/<filename>')
def send_node_angular_modules(filename):
    return static_file(filename, root='./node_modules/angular')


@get('/node_modules/angular-google-maps/dist/<filename>')
def send_node_maps_modules(filename):
    return static_file(filename, root='./node_modules/angular-google-maps/dist/')


@get('/node_modules/angular-simple-logger/dist/<filename>')
def send_node_maps_modules(filename):
    return static_file(filename, root='./node_modules/angular-simple-logger/dist/')


@get('/node_modules/lodash/<filename>')
def send_node_maps_modules(filename):
    return static_file(filename, root='./node_modules/lodash/')


# endregion

run(reloader=True)
