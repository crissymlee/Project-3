
function retrieveInfo(name) {
    d3.json("artist_test2.json").then((data) => {
        var metadata = data[0].Metadata;
        console.log(metadata)
        var result = metadata.filter(d => d.Artist === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        Object.entries(result).forEach((d) => {
            info.append("h6").text(d[0].toUpperCase() + ": " + d[1] + "\n");
        });
    });   
}

function optionChanged(name) {
    retrieveInfo(name);
}

function init() {
    
    var dropDown = d3.select('#selDataset');
    d3.json("artist_test2.json").then((data) => {
        console.log(data)
        data[0].Artists.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        // retrievePlot(name);
        retrieveInfo(data[0].Artists[0]);
    });
};

init();
