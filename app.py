from flask import Flask, jsonify, render_template, request, session
import pandas as pd # data wrangling

from math import pi

app = Flask(
    __name__,
    static_url_path='',
    static_folder='site',
    template_folder='site',
)
# app.config['SECRET_KEY'] = 'pk'


@app.route('/')
def index():
    # beta = request.args.get('inclinacion', 0, type=int)
    # alpha = request.args.get('orientacion', 0, type=int)
    # phi = request.args.get('latitud', 0, type=float)


    return render_template('index.html', x_aproximado=33333,n_inversores=4444)


if __name__ == '__main__':
    app.run('0.0.0.0', 8000,debug=True)
    