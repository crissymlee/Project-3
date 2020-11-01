
var sp = new SpotifyWebApi();
sp.setAccessToken('BQA4eaq9q1Z3gBzNK9uIGuhYbb2EO_Cxk5mXGS3z8kJRZu3XUzF9TK9Zk4cGdowdGvc1lZnbzisO6x1TyuI')

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
    getPopularity(name);
};

function getDanceability(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        // console.log(metadata);
        var artist = metadata.filter(d => d.Artist === name)[0];
        // console.log(artist);
        var artist_track_ids = artist.Track_ID;
        // console.log(artist_track_ids);
        sp.getAudioFeaturesForTracks(artist_track_ids).then(d => {
            var results = JSON.stringify(d)
            // console.log(results);
            var test = JSON.parse(results);
            // console.log(test);
            var track1dan = test.audio_features[0].danceability;
            var track2dan = test.audio_features[1].danceability;
            var track3dan = test.audio_features[2].danceability;
            var track4dan = test.audio_features[3].danceability;
            var track5dan = test.audio_features[4].danceability;
            var dance_list = [track1dan,track2dan,track3dan,track4dan,track5dan];
            // console.log(dance_list);
            });
        });   
    };

function getPopularity(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        console.log(metadata);
        var artist = metadata.filter(d => d.Artist === name)[0];
        console.log(artist);
        var artist_track_ids = artist.Track_ID;
        console.log(artist_track_ids);
        sp.getTracks(artist_track_ids).then(d => {
            var results = JSON.stringify(d)
            // console.log(results);
            var test = JSON.parse(results);
            console.log(test);
            track1pop = test.tracks[0].popularity;
            track2pop = test.tracks[1].popularity;
            track3pop = test.tracks[2].popularity;
            track4pop = test.tracks[3].popularity;
            track5pop = test.tracks[4].popularity;
            tracksPop_list = [track1pop, track2pop, track3pop, track4pop, track5pop];
            track_names = [test.tracks[0].name, test.tracks[1].name, test.tracks[2].name, test.tracks[3].name, test.tracks[4].name]
            console.log(tracksPop_list);

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
                    tickangle: "auto",
                    tickfont: {
                        size: 8.5
                    }
                },
                margin: {
                //     l: 100,
                //     r: 100,
                //     t: 100,
                    b: 150
                 }
        };
        Plotly.newPlot("bar",data,layout);
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
        getPopularity(data[0].Artists[0]);
    });
};

init();
