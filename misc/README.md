# deal-finder-app
An app to find deals close to you using Coveo 

## Description
This comes in 2 parts. The first one is the actual website, which is powered by Flask. The second part is adding the deals to a source, which comes in the form of `add_deals.py`. This is a demo of the capabilities of the Coveo Search engine.

## Install
#### Coveo platform:
This is for the deals
1. Rename the `example-config.yml` to `config.yml`
2. Create a new Push source called `deals`
3. Add the api key to `config.yml`
4. Add the source id to `config.yml`
5. Add the org id to `config.yml`
6. Create an api key and add it under `search_api_key` in `config.yml`
	1. Add this permission `Search > Execute queries > Enable`
7. Change the search url in `config.yml` to suite your platform

## Dependencies
1. `pip install pyyaml`
2. `pip install requests`
3. `pip install flask`

## How to run
After adding the deals to the source, simply start the flask app and head to `http://127.0.0.1:5000/`