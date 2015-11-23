# coding utf-8
import re

from bson import ObjectId
from pymongo import MongoClient

connection = MongoClient()

db = connection.gis

edts = db.edts


def list_edts(params):
    params = params.split(',')
    sitio = params[0]
    localidad = params[1]
    provincia = params[2]

    query = {'sitio': re.compile('.*' + sitio + '.*', re.IGNORECASE),
             'localidad': re.compile('.*' + localidad + '.*', re.IGNORECASE),
             'provincia': re.compile('.*' + provincia + '.*', re.IGNORECASE)}

    resultados = edts.find(query)

    return [edt for edt in resultados]


def closest_edt(latitude, longuitude):
    query = {'ubicacion': {'$near': {'$geometry': {' type': 'Point',
                                                   'coordinates': [float(longuitude), float(latitude)]
                                                   }}}}

    edts_by_distance = edts.find(query).limit(1)

    for edt in edts_by_distance:
        return edt


def update_or_insert_edt(edt):
    if '_id' in edt.keys():
        edt['_id'] = ObjectId(edt['_id']['$oid'])
    else:
        edt['_id'] = ObjectId()

    edt['altura_snm'] = float(edt['altura_snm'])
    edt['ubicacion']['coordinates'] = map(float, edt['ubicacion']['coordinates'])

    edts.save(edt)


def remove_edt(edt):
    edt['_id'] = ObjectId(edt['_id']['$oid'])
    edts.remove(edt)
