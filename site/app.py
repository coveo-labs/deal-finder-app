from flask import Flask, render_template, send_from_directory
import yaml
import os.path

app = Flask(__name__)
config = yaml.safe_load(open(os.path.dirname(__file__) + '/../config.yml'))


@app.context_processor
def inject_key():
    return dict(api_key=config['search_api_key'], api_url=config['search_url'])


@app.route("/")
def main():
    return render_template('index.html')


@app.route("/nearme")
def near():
    return render_template('near.html')


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


if __name__ == "__main__":
    app.run()
