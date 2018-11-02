$(document).ready(function(){

  $("#submit").click(function () {
    $.ajax({
      type: 'POST',
      url: '/search',
      data: JSON.stringify({tags:tags}),
      success: function(data) { 
        console.log(data);
        $.ajax({
          type: 'GET',
          url: 'http://localhost:3001/get_tweets/'+data,
          success: function(tweet){
            console.log(tweet);
            drawChart();
          }});
        },
      contentType: "application/json",
      dataType: 'json'
      });
    });
});

var btn = document.getElementById('submit');

function drawChart(){
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(drawChart);

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Sentiment');
  data.addColumn('number', 'Average Sentiment');

  data.addRow([
    [1,  37.8],
    [2,  30.9],
    [3,  25.4],
    [4,  11.7],
    [5,  11.9],
    [6,   8.8],
    [7,   7.6],
    [8,  12.3],
    [9,  16.9],
    [10, 12.8],
    [11,  5.3],
    [12,  6.6],
    [13,  4.8],
    [14,  4.2],
  ]);

  var options = {
    chart: { title: 'Average Sentiment Value' },
    width: 400,
    height: 300
  };

  var chart = new google.charts.Line(document.getElementById('chart'));

  chart.draw(data, google.charts.Line.convertOptions(options));
}