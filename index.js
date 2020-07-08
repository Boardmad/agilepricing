
var dataPoints = [];

window.onload = function() {

	// Call out for Octopus Agile Tarriffs Dataset
	$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/", callback);	

}

function callback(data) {		
		dataPoints.push(data.single_register_electricity_tariffs._A.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._B.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._C.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._D.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._E.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._F.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._G.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._H.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._J.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._K.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._M.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._N.direct_debit_monthly.links[1].href + "<br />");
		dataPoints.push(data.single_register_electricity_tariffs._P.direct_debit_monthly.links[1].href + "<br />");
		
		//alert(dataPoints.join());

		$("#divTarrifs").html(dataPoints.join());

}