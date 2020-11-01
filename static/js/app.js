
var sp = new SpotifyWebApi();
sp.setAccessToken('BQA4eaq9q1Z3gBzNK9uIGuhYbb2EO_Cxk5mXGS3z8kJRZu3XUzF9TK9Zk4cGdowdGvc1lZnbzisO6x1TyuI')

function retrieveInfo(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        var result = metadata.filter(d => d.Artist === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        info.append("h6").text("Artist: " + Object(result.Artist));
        Object.entries(result.Tracks).forEach((d,i) => {
            info.append("h6").text((i+1) + ": "+ d[1] + "\n");
        });
    });   
}

function getAudioFeatures(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var artist_track_ids = artist.Track_ID;
        sp.getAudioFeaturesForTracks(artist_track_ids).then(d => {
            var results = JSON.stringify(d)
            var test = JSON.parse(results);
            var track1dan = test.audio_features[0].danceability;
            });
        });   
    };

function getPopularity(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var artist_track_ids = artist.Track_ID;
        sp.getTracks(artist_track_ids).then(d => {
            var results = JSON.stringify(d)
            var test = JSON.parse(results);
            tracksPop_list = [test.tracks[0].popularity,
                              test.tracks[1].popularity,
                              test.tracks[2].popularity,
                              test.tracks[3].popularity,
                              test.tracks[4].popularity];
            track_names = [test.tracks[0].name,
                           test.tracks[1].name,
                           test.tracks[2].name,
                           test.tracks[3].name,
                           test.tracks[4].name];

            // building bar chart
            var trace = {
                x: track_names,
                y: tracksPop_list,
                text: track_names,
                type: "bar",
                marker: {
                    color: '#3CB371'
                }
            };

            var data = [trace];

            var layout = {
                title: `Popularity of Top Five Songs`,
                yaxis: {
                    range: [50,95],
                    tickmode:"linear",
                    tick0: 0,
                    dtick: 5,
                },
                xaxis: {
                    tickmode: "auto",
                    tickfont: {
                        size: 8.5
                    }
                },
                margin: {
                    b: 150
                 }
        };
        Plotly.newPlot("bar",data,layout);
        });
    });
};

function optionChanged(name) {
    retrieveInfo(name);
    getAudioFeatures(name);
    getPopularity(name);
};

function init() {
    
    var dropDown = d3.select('#selDataset');
    d3.json("artist_test2.json").then((data) => {
        data[0].Artists.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        retrieveInfo(data[0].Artists[0]);
        getAudioFeatures(data[0].Artists[0]);
        getPopularity(data[0].Artists[0]);
    });
};

init();
