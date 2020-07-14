
var chart = null;
var tariffDPS = [];
var dataPoints = [];

window.onload = function() {

	// Call out for Octopus Agile Tarriffs Dataset
	$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/", tariffsCallback)	
	//.done(function() { $("#divOutput").html($("#divOutput").html+"< br />getJSON Tariffs completed"); })
	//.fail(function(jqXHR, textStatus, errorThrown) { $("#divOutput").html($("#divOutput").html+"< br />Failed to retrieve agile tariffs data" + textStatus); })
	// Note trailing semi !
	;
}

function tariffsCallback(data) {		
	var iterArr = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P"];
	var i, len;
	for (len = iterArr.length, i=0; i<len; i++) {	
		
		// Ugly - no obvious way to programatically retrieve the tariffs from the all_tariffs JSON
		tariffDPS.push("<input id=\""+iterArr[i]+"\" type=\"button\" value=\"", eval("data.single_register_electricity_tariffs._"+iterArr[i]+".direct_debit_monthly.code"), "\" onclick=\"getTariffData(\'", eval("data.single_register_electricity_tariffs._"+iterArr[i]+".direct_debit_monthly.links[1].href"), "\',\'", eval("data.single_register_electricity_tariffs._"+iterArr[i]+".direct_debit_monthly.code"), "\');\" /><br />");
	
	}	
	/* never build an HTML string in a loop, load to array then join with emptystring */
	$("#divTariffs").html(tariffDPS.join(''));
}

function getTariffData(endpoint, tariff) {
	// re-initialise the chart object
	chart = null;
	dataPoints = [];

	chart = new CanvasJS.Chart("divChart", {
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		theme: "light1",
		title: {
			text: "Tariff: " + tariff
		},
		axisX:{
			stripLines: [{
				value: Date.now() ,
				label: "Now",
				labelFontColor: "#808080",
				labelAlign: "near",
				thickness: 3,
				}],
			crosshair: {
				enabled: true,
				snapToDataPoint: true,
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
	$.getJSON(endpoint, tariffCallback)	
	//.done(function() { $("#divOutput").html($("#divOutput").html+"< br />getJSON Tariff completed"); })
	//.fail(function(jqXHR, textStatus, errorThrown) { $("#divOutput").html($("#divOutput").html+"< br />Failed to retrieve tariff data" + textStatus); })
	// Note trailing semi!
	;
}

function tariffCallback(data) {			
	var i, len;
	var lo=20; //fake lowest low
	var hi=0;
	for (len = data.results.length, i=0; i<len; i++) {	
		// evaluate and set lo/hi price range values
		if (data.results[i].value_inc_vat < lo){
			lo = data.results[i].value_inc_vat;
		}
		if (data.results[i].value_inc_vat > hi){
			hi = data.results[i].value_inc_vat;
		}

		//evaluate if price point is less that zero and style accordingly
		if (data.results[i].value_inc_vat <= 0) {
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
		}else{
			dataPoints.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
		}
	} 

	//Update price range label
	$("#divRange").html("Price Range: " +lo+" - "+hi+ "p per kWh");
	//Render the chart object
	chart.render(); 
}