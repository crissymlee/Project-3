from flask import Flask, render_template, redirect
import pymongo

app = Flask(__name__)
conn = 'mongodb://localhost:27017'
mongo = pymongo.MongoClient(conn)
db = mongo.spotify_db
collection = db.artist_info


@app.route("/")
def index():
   spotify = collection.find_one()
   return render_template("index.html", spotify=spotify)

if __name__ == "__main__":
    app.run(debug=True)