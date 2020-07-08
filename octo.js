
var chart = null;
var dataPoints = [];
var tariffDPS = [];

window.onload = function() {

// Call out for Octopus Agile Tarriffs Dataset
$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/", callback(data, 0));	

}

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
$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-A/standard-unit-rates", callback(data, 1));	


function callback(data, opt) {	
	
	if (opt > 0) {
		
		var i, len;
		for (len = data.results.length, i=0; i<len; i++) {	
			if (data.results[i].value_inc_vat <= 0) {
				dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
			}else{
				dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
			}
		} 
		chart.render(); 

	}else{

		tariffDPS.push(data.single_register_electricity_tariffs._A.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._A.direct_debit_monthly.code, data.single_register_electricity_tariffs._A.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._B.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._B.direct_debit_monthly.code, data.single_register_electricity_tariffs._B.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._C.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._C.direct_debit_monthly.code, data.single_register_electricity_tariffs._C.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._D.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._D.direct_debit_monthly.code, data.single_register_electricity_tariffs._D.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._E.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._E.direct_debit_monthly.code, data.single_register_electricity_tariffs._E.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._F.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._F.direct_debit_monthly.code, data.single_register_electricity_tariffs._F.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._G.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._G.direct_debit_monthly.code, data.single_register_electricity_tariffs._G.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._H.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._H.direct_debit_monthly.code, data.single_register_electricity_tariffs._H.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._J.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._J.direct_debit_monthly.code, data.single_register_electricity_tariffs._J.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._K.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._K.direct_debit_monthly.code, data.single_register_electricity_tariffs._K.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._L.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._L.direct_debit_monthly.code, data.single_register_electricity_tariffs._L.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._M.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._M.direct_debit_monthly.code, data.single_register_electricity_tariffs._M.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._N.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._N.direct_debit_monthly.code, data.single_register_electricity_tariffs._N.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
		tariffDPS.push(data.single_register_electricity_tariffs._P.direct_debit_monthly.links[1].href, data.single_register_electricity_tariffs._P.direct_debit_monthly.code, data.single_register_electricity_tariffs._P.direct_debit_monthly.standard_unit_rate_inc_vat + "<br />");
			
		/* uncomment to debug */
		$("#divTariffs").html(tariffDPS.join(''));
	}	
}