# coding utf-8

from pymongo import MongoClient, GEOSPHERE

connection = MongoClient()

db = connection.gis

raw = db.raw
edts = db.edts


def extract_and_transform_data():
    edts.drop()
    unwind = {'$unwind': "$features"}
    base = '$features.properties.'
    project = {'$project': {'_id': 0, 'altura_snm': base + 'Altura_snm', 'sitio': base + 'Sitio',
                            'provincia': base + 'Provincia', 'localidad': base + 'Localidad',
                            'latitud': base + 'Latitud',
                            'longitud': base + 'Longitud'}}
    out = {'$out': 'edts'}

    raw.aggregate([unwind, project, out])

    for edt in edts.find():
        longitud = edt['longitud']
        latitud = edt['latitud']
        edt['ubicacion'] = {'type': 'Point', 'coordinates': [longitud, latitud]}
        map(edt.pop, ['latitud', 'longitud'])
        edts.save(edt)

        if not 'ubicacion' + GEOSPHERE in edts.list_indexes():
            edts.create_index([('ubicacion', GEOSPHERE)])


extract_and_transform_data()
