# coding utf-8
from pymongo import MongoClient

connection = MongoClient()

db = connection.gis

edts = db.edts


def list_edts():
    return [edt for edt in edts.find()]


def closest_edt(latitude, longuitude):
    query = {'ubicacion': {'$near': {'$geometry': {' type': 'Point',
                                                   'coordinates': [float(longuitude), float(latitude)]
                                                   }}}}

    edts_by_distance = edts.find(query).limit(1)

    for edt in edts_by_distance:
        return edt
