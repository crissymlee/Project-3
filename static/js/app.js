
var sp = new SpotifyWebApi();
sp.setAccessToken('BQBK-HSwe7rVUPcc-Dz43QL6vjO8qJbNHSaHcQkRJ-5dlpBINpus2Km0FVZ1JXg1avb6PbAhtz-fuZWrXj4')

function retrieveInfo(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        console.log(metadata)
        var result = metadata.filter(d => d.Artist === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        info.append("h6").text("Artist: " + Object(result.Artist));
        Object.entries(result.Tracks).forEach((d,i) => {
            info.append("h6").text((i+1) + ": "+ d[1] + "\n");
        });
    });   
}

function optionChanged(name) {
    retrieveInfo(name);
    getDanceability(name);
};

function getDanceability(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        console.log(metadata);
        var artist = metadata.filter(d => d.Artist === name)[0];
        console.log(artist);
        var artist_track_ids = artist.Track_ID;
        console.log(artist_track_ids);
        sp.getAudioFeaturesForTracks(artist_track_ids).then(d => {
            var results = JSON.stringify(d)
            console.log(results);
            var test = JSON.parse(results);
            console.log(test);
            var track1dan = test.audio_features[0].danceability;
            var track2dan = test.audio_features[1].danceability;
            var track3dan = test.audio_features[2].danceability;
            var track4dan = test.audio_features[3].danceability;
            var track5dan = test.audio_features[4].danceability;
            var dance_list = [track1dan,track2dan,track3dan,track4dan,track5dan];
            console.log(dance_list);
            });
        });   
    };



function init() {
    
    var dropDown = d3.select('#selDataset');
    d3.json("artist_test2.json").then((data) => {
        console.log(data)
        data[0].Artists.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        // retrievePlot(name);
        retrieveInfo(data[0].Artists[0]);
        getDanceability(data[0].Artists[0]);
    });
};

init();
