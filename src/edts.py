# coding utf-8
from etl import edts


def list_edts():
    return [edt for edt in edts.find()]


def closest_edt(latitude, longuitude):
    query = {'ubicacion': {'$near': {'$geometry': {' type': 'Point',
                                                   'coordinates': [longuitude, latitude]
                                                   }}}}

    edts_by_distance = edts.find(query).limit(1)

    for edt in edts_by_distance:
        return edt
