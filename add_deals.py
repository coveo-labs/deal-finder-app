#!/usr/bin/python
import requests
import json
import time
import zlib
import base64
import yaml

config = yaml.safe_load(open('config.yml'))


def sendFile(fileName, docId, data):
	source_id = config['source_id']
	org_id = config['org_id']
	document_id = docId
	api_key = config['api_key']
	push_url = config['push_url']

	url = "https://{}/v1/organizations/" + \
		"{}/sources/{}/documents?documentId={}".format(push_url, org_id, source_id, document_id)

	headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer {}".format(api_key)
	}

	r = requests.put(url, data=json.dumps(data), headers=headers)

	print docId
	print r.status_code
	print r.text

deals = [
	{
		'company_name': 'McDonald\'s',
		'deal_type': 'sale',
		'latitude': 46.766872,
		'longitude': -71.311447,
		'description': '50% off Big Macs'
	},
	{
		'company_name': 'IGA',
		'deal_type': 'coupon',
		'latitude': 46.765459,
		'longitude': -71.308902,
		'description': '10% off all dairy products'
	},
	{
		'company_name': 'Couche-Tard',
		'deal_type': 'sale',
		'latitude': 46.767544,
		'longitude': -71.310672,
		'description': '1¢ off all gas'
	},
	{
		'company_name': 'Ben & Florentine',
		'deal_type': 'sale',
		'latitude': 46.769748,
		'longitude': -71.303165,
		'description': '15% off for companies in the area'
	}
]

for deal in deals:
	name = str(time.time())
	sendFile(name, "deal://{}".format(deal['company_name']), deal)
