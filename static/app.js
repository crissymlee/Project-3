
function retrievePlot(name) {

    // getting data from json file
    d3.json("artist_data2.json").then((data) => {

    var artists = data.Metadata.filter(d => d.Artist === name)[0];

    var tracks = data.Metadata.tracks;

    var track_ids = data.Metadata.filter(d => d.Track_ID.slice(14,36));
    
    var play_track = data.Metadata.Track_Play_URL;

    // bar chart
    var trace = {
        x: sample_values,
        y: otu_id,
        text: labels,
        marker: {
            color: '#3CB371'},
            type: "bar",
            orientation: "h"
        };

    var data = [trace];

    var layout = {
        title: "Top 10 OTUs Bar Chart",
        yaxis: {
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };

    Plotly.newPlot("bar",data,layout);

    // bubble chart

    var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: [
                '#0000ff',
                '#0000e5',
                '#0000cc',
                '#0000b2',
                '#000099',
                '#00007f',
                '#000066',
                '#00004c',
                '#000033',
                '#000019',
                '#000000'
            ]
        },
        text: samples.otu_labels
    };

    var layout2 = {
        title:"Top 10 OTUs Bubble Chart",
        xaxis:{title: "OTU ID"},
        yaxis:{title: "Sample Values"},
        height: 600,
        width: 1000
    };

    var data2 = [trace2];

    Plotly.newPlot("bubble",data2,layout2);

    // gauge chart

    var trace3 = {
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        value: parseFloat(washFreq),
        title: { text: "Wash Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 9], tickwidth:1, tickcolor:"maroon"},
            bar: {color:"gold"},
            steps: [
                { range: [0, 1], color: "#E6E6FA"},
                { range: [1, 2], color: "#D8BFD8"},
                { range: [2, 3], color: "#DA70D6"},
                { range: [3, 4], color: "#BA55D3"},
                { range: [4, 5], color: "#9400D3"},
                { range: [5, 6], color: "#8B008B"},
                { range: [6, 7], color: "#9370DB"},
                { range: [7, 8], color: "#8A2BE2"},
                { range: [8, 9], color: "#4B0082"},
            ] 
        }
    };

    var layout3 = {
        width: 600,
        height: 500,
        margin: {
            t:0,
            b:0
        }
    };

    var data3 = [trace3];
    
    Plotly.newPlot("gauge",data3,layout3);
});

    
}


function retrieveInfo(name) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(d => d.id.toString() === name)[0];
        var info = d3.select('#sample-metadata');
        info.html("");
        Object.entries(result).forEach((d) => {
            info.append("h6").text(d[0].toUpperCase() + ": " + d[1] + "\n");
        });
    });   
}


function optionChanged(name) {
    retrievePlot(name);
    retrieveInfo(name);
}

function init() {
    var dropDown = d3.select('#selDataset');
    d3.json("artist_data2.json").then((data) => {
        console.log(data)
        data.Artists.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        // retrievePlot(data.Artists[0]);
        // retrieveInfo(data.Artists[0]);
    });
}

init();