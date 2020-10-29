
var sp = new SpotifyWebApi();
sp.setAccessToken("BQAC1mZvKTvGY0lPs6gSckoIAUbvUgY1-F7hQY-36Zp6MyBcdpyHZTl5xea_5E3q8B5YjAEhgpHYjlg712g")

function getTrackFeatures(track) {
    d3.json("artist_test2.json").then((data) => {
        var track_id = "";
        var metadata = data[0].Metadata;
        var result = metadata.filter(d => d.Artist.Tracks === track);
        console.log(result);
    });
};

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
    getTracks(name);
}

function optionChanged2(track) {
    getTrackFeatures(track);
};

function getTracks(name) {
    var dropDown2 = d3.select('#selDataset2');
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        var result1 = metadata.filter(d => d.Artist === name)[0];
        console.log(result1);
        var tracks = Object.entries(result1.Tracks)
        dropDown2.html("")
        tracks.forEach(d => {
            dropDown2.append("option").text(d[1]).property("value");
        });
})
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
        getTracks(data[0].Artists[0]);
    });
};

init();
