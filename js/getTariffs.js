
var chart = null;
var tariffDPS = [];
var dataPoints = [];

window.onload = function() {

	// Call out for Octopus Agile Tarriffs Dataset
	$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/", tariffsCallback);	

}

function tariffsCallback(data) {		
	
	tariffDPS.push("<input id=\"A\" type=\"button\" value=\"", data.single_register_electricity_tariffs._A.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._A.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._A.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"B\" type=\"button\" value=\"", data.single_register_electricity_tariffs._B.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._B.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._B.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"C\" type=\"button\" value=\"", data.single_register_electricity_tariffs._C.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._C.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._C.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"D\" type=\"button\" value=\"", data.single_register_electricity_tariffs._D.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._D.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._D.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"E\" type=\"button\" value=\"", data.single_register_electricity_tariffs._E.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._E.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._E.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"F\" type=\"button\" value=\"", data.single_register_electricity_tariffs._F.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._F.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._F.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"G\" type=\"button\" value=\"", data.single_register_electricity_tariffs._G.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._G.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._G.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"H\" type=\"button\" value=\"", data.single_register_electricity_tariffs._H.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._H.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._H.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"J\" type=\"button\" value=\"", data.single_register_electricity_tariffs._J.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._J.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._J.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"K\" type=\"button\" value=\"", data.single_register_electricity_tariffs._K.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._K.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._K.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"L\" type=\"button\" value=\"", data.single_register_electricity_tariffs._L.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._L.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._L.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"M\" type=\"button\" value=\"", data.single_register_electricity_tariffs._M.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._M.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._M.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"N\" type=\"button\" value=\"", data.single_register_electricity_tariffs._N.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._N.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._N.direct_debit_monthly.code, "\');\" /><br />");
	tariffDPS.push("<input id=\"P\" type=\"button\" value=\"", data.single_register_electricity_tariffs._P.direct_debit_monthly.code, "\" onclick=\"getTariffData(\'", data.single_register_electricity_tariffs._P.direct_debit_monthly.links[1].href, "\',\'", data.single_register_electricity_tariffs._P.direct_debit_monthly.code, "\');\" />");	
	
	/* never build an HTML string in a loop, load to array then join with emptystring */
	$("#divTariffs").html(tariffDPS.join(''));
}

function getTariffData(endpoint, tariff) {

	// re-initialise the chart object
	chart = null;
	dataPoints = [];
	//alert(endpoint);
	//alert(tariff);

	chart = new CanvasJS.Chart("divChart", {
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		theme: "light1",
		title: {
			text: "Tariff: " + tariff
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
			minimum: 0,
			interval: 5,
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

	//alert("Getting " + endpoint)
	// Call out for specific Agile Tariff Dataset
	$.getJSON(endpoint, tariffCallback);	

}

function tariffCallback(data) {			
	var i, len;
	var lo=10;
	var hi=0;
	for (len = data.results.length, i=0; i<len; i++) {	
		if (data.results[i].value_inc_vat < lo){
			lo = data.results[i].value_inc_vat;
		}
		if (data.results[i].value_inc_vat > hi){
			hi = data.results[i].value_inc_vat;
		}

		if (data.results[i].value_inc_vat <= 0) {
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
		}else{
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
		}
	} 
	$("#divRange").html(lo+" - "+hi);
	chart.render(); 
}