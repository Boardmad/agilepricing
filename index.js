
var dataPoints = [];

window.onload = function() {

	// Call out for Octopus Agile Tarriffs Dataset
	$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/", callback);	

}

function callback(data) {		
		dataPoints.push(data.single_register_electricity_tariffs._A.direct_debit_monthly.links[1].href);
		dataPoints.push(data.single_register_electricity_tariffs._B.direct_debit_monthly.links[1].href);
		dataPoints.push(data.single_register_electricity_tariffs._C.direct_debit_monthly.links[1].href);
		dataPoints.push(data.single_register_electricity_tariffs._D.direct_debit_monthly.links[1].href);
		dataPoints.push(data.single_register_electricity_tariffs._E.direct_debit_monthly.links[1].href);
		dataPoints.push(data.single_register_electricity_tariffs._F.direct_debit_monthly.links[1].href);

		alert(dataPoints.join.toString());

		$("#divTarrifs").html(datapoints.join()).css("background-color", "orange");

}