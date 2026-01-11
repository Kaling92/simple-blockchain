import requests
import json

BASE = 'http://localhost:5000'

print('Registering nodes...')
r = requests.post(BASE + '/nodes/register', json={'nodes': ['http://localhost:5001']})
try:
    print(r.status_code, r.json())
except Exception:
    print(r.status_code, r.text)

print('\nCreating a transaction...')
r = requests.post(BASE + '/transactions/new', json={'sender':'a','recipient':'b','amount':1})
print(r.status_code, r.json())

print('\nMining...')
r = requests.get(BASE + '/mine')
print(r.status_code, r.json())

print('\nChain:')
r = requests.get(BASE + '/chain')
print(r.status_code, json.dumps(r.json(), indent=2))

print('\nResolving conflicts...')
r = requests.get(BASE + '/nodes/resolve')
print(r.status_code, r.json())
