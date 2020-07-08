
var chart = null;
var dataPoints = [];

window.onload = function() {

chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	zoomEnabled: true,
	exportEnabled: true,
	theme: "light1",
	title: {
		text: "Octopus Agile Pricing"
	},
	axisX:{
		crosshair: {
			enabled: true,
			snapToDataPoint: true,
			stripLines: [{
			value: 3,
			label: "Now",
			labelFontColor: "#808080",
			labelAlign: "near"
			}]
		}		
	},
	axisY: {
		title: "pence per kWh",
		includeZero: false,
		crosshair: {
			enabled: true,
			snapToDataPoint: true,
			labelFormatter: function(e) {
				return CanvasJS.formatNumber(e.value, "##0.000") + " p/kWh";
			}
		}
	},
	data: [{
		type: "area",
		markerSize: 12,
		xValueType: "dateTime",
		xValueFormatString: "DD MMM hh:mm TT",
		valueFormatString: "##0",
		connectNullData: true,
		dataPoints: dataPoints
	}]
});

// Call out for Octopus Agile Tarriff Dataset
$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-A/standard-unit-rates", callback);	

}

function callback(data) {	
	var i, len;
	for (len = data.results.length, i=0; i<len; i++) {	
		if (data.results[i].value_inc_vat <= 0) {
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
		}else{
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
		}
	} 
	chart.render(); 
}