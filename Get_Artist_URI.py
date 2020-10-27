import argparse
import logging
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint

client_id = "087c43da5f8f4701af2195902f821d91"
client_secret = "4f1fae6fda2b4304a72390aeeca957fc"
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

top_50 = pd.read_csv('top50.csv')

artist_list = top_50['Artist']

def getUri(artist_list):

	uriList = []

	for Artist in artist_list:
		name = Artist #chosen artist
		result = sp.search(name) #search query
		geturi = result['tracks']['items'][0]['artists']
		temp_df = pd.DataFrame(geturi)
		uriList.append(temp_df['uri'][0])
	artistUri_df = pd.DataFrame(list(zip(artist_list,uriList)),columns = ["Artists","uri"])
	return artistUri_df

uri_df = pd.DataFrame()
uri_df = getUri(artist_list)

uri_df.to_csv('artistURIs.csv')