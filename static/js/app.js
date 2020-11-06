
var sp = new SpotifyWebApi();

// paste access token from spotify_data_extraction.ipynb within the setAccessToken method below

sp.setAccessToken('BQC4zj6A8y6RMK_UDZAxO7b6lhywDBPSgisQmygGw9a5OiwPjvhg12V6V04iJ1Bu_d_Aqoc1b47HnujU5dU')

function retrieveInfo(name) {
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var result = metadata.filter(d => d.Artist === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        info.append("h2").attr("style","color: white; text-align: center").text("Artist: " + Object(result.Artist));
        info.append("hr").attr("style","background: white");
        Object.entries(result.Tracks).forEach((d,i) => {
            info.append("h4").attr("style","color: white; text-align: center").text((i+1) + ": "+ d[1] + "\n");
        });
    });   
}

function getAudioFeatures(name) {
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var artist_track_ids = artist.Track_ID;
        var track_names1 = artist.Tracks;
            sp.getAudioFeaturesForTracks(artist_track_ids).then(d => {
                var results = JSON.stringify(d)
                var test = JSON.parse(results);
                var track1dan = test.audio_features[0].danceability;
                var track2dan = test.audio_features[1].danceability;
                var track3dan = test.audio_features[2].danceability;
                var track4dan = test.audio_features[3].danceability;
                var track5dan = test.audio_features[4].danceability;
                var track1a = test.audio_features[0].acousticness;
                var track2a = test.audio_features[1].acousticness;
                var track3a = test.audio_features[2].acousticness;
                var track4a = test.audio_features[3].acousticness;
                var track5a = test.audio_features[4].acousticness;
                var track1e = test.audio_features[0].energy;
                var track2e = test.audio_features[1].energy;
                var track3e = test.audio_features[2].energy;
                var track4e = test.audio_features[3].energy;
                var track5e = test.audio_features[4].energy;
                var track1i = test.audio_features[0].valence;
                var track2i = test.audio_features[1].valence;
                var track3i = test.audio_features[2].valence;
                var track4i = test.audio_features[3].valence;
                var track5i = test.audio_features[4].valence;
                var track1l = test.audio_features[0].liveness;
                var track2l = test.audio_features[1].liveness;
                var track3l = test.audio_features[2].liveness;
                var track4l = test.audio_features[3].liveness;
                var track5l = test.audio_features[4].liveness;
                var track1s = test.audio_features[0].speechiness;
                var track2s = test.audio_features[1].speechiness;
                var track3s = test.audio_features[2].speechiness;
                var track4s = test.audio_features[3].speechiness;
                var track5s = test.audio_features[4].speechiness;
            
    data = [
    {
    type: 'scatterpolar',
    r: [track1dan, track1a, track1e, track1i, track1l, track1s, track1dan],
    theta: ['Danceability','Acousticness','Energy', 'Valence', 'Liveness', 'Speechiness', 'Danceability'],
    fill: 'toself',
    name: track_names1[0]
    },
    {
    type: 'scatterpolar',
    r: [track2dan, track2a, track2e, track2i,, track2l, track2s, track2dan],
    theta: ['Danceability','Acousticness','Energy', 'Valence', 'Liveness', 'Speechiness', 'Danceability'],
    fill: 'toself',
    name: track_names1[1]
    },
    {
    type: 'scatterpolar',
    r: [track3dan, track3a, track3e, track3i, track3l, track3s, track3dan],
    theta: ['Danceability','Acousticness','Energy', 'Valence', 'Liveness', 'Speechiness', 'Danceability'],
    fill: 'toself',
    name: track_names1[2]
    },
    {
    type: 'scatterpolar',
    r: [track4dan, track4a, track4e, track4i, track4l, track4s, track4dan],
    theta: ['Danceability','Acousticness','Energy', 'Valence', 'Liveness', 'Speechiness', 'Danceability'],
    fill: 'toself',
    name: track_names1[3]
    },
    {
    type: 'scatterpolar',
    r: [track5dan, track5a, track5e, track5i, track5l, track5s, track5dan],
    theta: ['Danceability','Acousticness','Energy', 'Valence', 'Liveness', 'Speechiness', 'Danceability'],
    fill: 'toself',
    name: track_names1[4]
    }
  ]
    layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 1]
        }
      }
    }
    Plotly.newPlot("radar", data, layout)
})
    })
};

function getPopularity(name) {
    d3.json("artist_data.json").then((data) => {
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
                    color: '#43e'
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
                    },
                    tickangle: 45
                },
                margin: {
                    b: 200
                 }
        };
        Plotly.newPlot("bar",data,layout);
        });
    });
};

function getEmbed(name) {
    var embed = d3.select('#play_url')
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var play_url = artist.Track_Play_URL[0];
        embed
            .attr("src",play_url)
            .attr("width","300")
            .attr("height","80")
            .attr("frameborder","0")
            .attr("allowtransparency","true")
            .attr("allow","encrypted-media")
            .attr("class","container-fluid");
    });
    var embed2 = d3.select('#play_url2')
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var play_url = artist.Track_Play_URL[1];
        embed2
            .attr("src",play_url)
            .attr("width","300")
            .attr("height","80")
            .attr("frameborder","0")
            .attr("allowtransparency","true")
            .attr("allow","encrypted-media")
            .attr("class","container-fluid");
    });
    var embed3 = d3.select('#play_url3')
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var play_url = artist.Track_Play_URL[2];
        embed3
            .attr("src",play_url)
            .attr("width","300")
            .attr("height","80")
            .attr("frameborder","0")
            .attr("allowtransparency","true")
            .attr("allow","encrypted-media")
            .attr("class","container-fluid");
    });
    var embed4 = d3.select('#play_url4')
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var play_url = artist.Track_Play_URL[3];
        embed4
            .attr("src",play_url)
            .attr("width","300")
            .attr("height","80")
            .attr("frameborder","0")
            .attr("allowtransparency","true")
            .attr("allow","encrypted-media")
            .attr("class","container-fluid");
    });
    var embed5 = d3.select('#play_url5')
    d3.json("artist_data.json").then((data) => {
        var metadata = data[0].Metadata;
        var artist = metadata.filter(d => d.Artist === name)[0];
        var play_url = artist.Track_Play_URL[4];
        embed5
            .attr("src",play_url)
            .attr("width","300")
            .attr("height","80")
            .attr("frameborder","0")
            .attr("allowtransparency","true")
            .attr("allow","encrypted-media")
            .attr("class","container-fluid");
    });
}

function optionChanged(name) {
    retrieveInfo(name);
    getAudioFeatures(name);
    getPopularity(name);
    getEmbed(name);
};

function init() {
    
    var dropDown = d3.select('#selDataset');
    d3.json("artist_data.json").then((data) => {
        data[0].Artists.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        retrieveInfo(data[0].Artists[0]);
        getPopularity(data[0].Artists[0]);
        getAudioFeatures(data[0].Artists[0]);
        getEmbed(data[0].Artists[0]);
    });
};

init();
