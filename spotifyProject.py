import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import pandas as pd



client_id = "55b64fd8ecba4296a64acc360984cd7a"
client_secret = "66d862ad6d81440a9a9ab8ce22fccd3e"

client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager) #spotify object to access API

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

print(uri_df)