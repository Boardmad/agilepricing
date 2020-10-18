
var chart = null;
var tarData = [];// An array of datapoints for the retrieved tariff 
var elecData = [];  // An array of datapoints for our electricity endpoint
var gasData = [];	// An array of datapoints for our gas meter
var earliest = new Date();
var lo = 20;
var hi = 0;
//var paging = 1;		// An interator for moving through data pages...not yet implemente

window.onload = function() { drawChart(); }

function drawChart() {
	// re-initialise the chart object
	chart = null;
	//dataPoints = [];
	chart = new CanvasJS.Chart("divChart", {
		animationEnabled: false,
		zoomEnabled: true,
		exportEnabled: true,
		theme: "light2",
		title: { text: "Octopus Agile"},
		axisX:{
			stripLines: [{ value: Date.now(), label: "Now",	labelFontColor: "#808080", labelAlign: "near",	thickness: 3 }],
			crosshair: { enabled: true,	snapToDataPoint: true }		
			},
		axisY: {
			minimum: 0,	interval: 5, title: "Tariff / kWh", includeZero: false, crosshair: 
				{ enabled: true, snapToDataPoint: true,	labelFormatter: function(e) { return CanvasJS.formatNumber(e.value, "##0.000") + " p/kWh"; }
            }
        },
        axisY2:{
			minimum: 0,	interval: 1, title: "Electricity spend", includeZero: false, suffix: "p", crosshair: 
				{ enabled: true, snapToDataPoint: true,	labelFormatter: function(e) { return CanvasJS.formatNumber(e.value, "##0.000") + " p/kWh"; }
            }
        },
        toolTip: {
            shared: true
        },
		data: [
			{ 
				type: "area", 
                name: "Tariff cost",
                showInLegend: true,
                markerSize: 12, 
				xValueType: "dateTime", 
				xValueFormatString: "DD MMM hh:mm TT", 
				valueFormatString: "##0",	
                connectNullData: true,	
                axisYIndex: 0,
				dataPoints: tarData 
            },
            {
                type: "line", 
                name: "Electricity usage",
                color: "#C24642",
                showInLegend: true,
				xValueType: "dateTime", 
				xValueFormatString: "DD MMM hh:mm TT", 
				yValueFormatString: "£0.00",	
                connectNullData: true,	
                axisYType: "secondary",              
				dataPoints: elecData 
            }
		]
    });


    // Call out for specific Agile Tariff Dataset - can use .getJSON as tariff data is un-authenticated
	//$.getJSON("https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-A/standard-unit-rates/", tariffCallback)	
	//.done(function() { $("#divOutput").html($("#divOutput").html+"< br />getJSON Tariff completed"); })
	//.fail(function(jqXHR, textStatus, errorThrown) { alert("Failed to retrieve hourly pricing data" + textStatus); }) ;
    
    $.ajax
    ({
      type: "GET",
      url: "https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-A/standard-unit-rates/",
      dataType: "json",
      //headers: {"Authorization": "Basic " + btoa("sk_live_fiqOWmIlFXa3ucEU3L3ro2AD:")},
      data: "",
      success: function(data) {
        //  Success block
        for (len = data.results.length, i=0; i<len; i++) {	
    
            // evaluate and set lo/hi price range values
            if (data.results[i].value_inc_vat < lo){
                lo = data.results[i].value_inc_vat;
            }
            if (data.results[i].value_inc_vat > hi){
                hi = data.results[i].value_inc_vat;
            }
            if (new Date(data.results[i].valid_to) < new Date(earliest)) {
                earliest = new Date(data.results[i].valid_to);
            }
           
            //evaluate if price point is less that zero and style accordingly
            if (data.results[i].value_inc_vat <= 5) {
                tarData.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
            }else{
                tarData.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
            }
        } 

        //Update price range label
        $("#divRange").html("Price Range: " +lo+" - "+hi+ "p per kWh");
        //Render the chart object
        chart.render(); 

      },
      error: function (xhr,ajaxOptions,throwError){
       //Error block 
       alert("Error retrieving Tariff Data: " + throwError)
      } 
    });


    // Meter usage data is authenticated and requires headers set and issued prior to GET being initiated 
    // or you just get 401
    $.ajax
    ({
      type: "GET",
      url: "https://api.octopus.energy/v1/electricity-meter-points/2700001871092/meters/20L3351332/consumption/",
      dataType: "json",
      headers: {"Authorization": "Basic " + btoa("sk_live_fiqOWmIlFXa3ucEU3L3ro2AD:")},
      data: "",
      success: function(data) {
        //  Success block
        for (len = data.results.length, i=0; i<len; i++) {	
            if (new Date(data.results[i].interval_end) < earliest){
                elecData.push({x: new Date(data.results[i].interval_end),	y: data.results[i].consumption, markerType: "none" });	
            }
        } 
      },
      error: function (xhr,ajaxOptions,throwError){
       //Error block 
       alert("Error retrieving Electricity Meter Data: " + throwError)
      } 
    });

}

// Helpers
function tariffCallback(data) {			
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
        if (Date(data.results[i].valid_to) < earliest){
         //   earliest = Date(data.results[i].valid_to);
        }
		//evaluate if price point is less that zero and style accordingly
		if (data.results[i].value_inc_vat <= 5) {
			tarData.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "cross", markerColor: "tomato" });	
		}else{
			tarData.push({x: new Date(data.results[i].valid_to),	y: data.results[i].value_inc_vat, markerType: "none"});
		}
    } 
	//Update price range label
	$("#divRange").html("Price Range: " +lo+" - "+hi+ "p per kWh");
	//Render the chart object
	chart.render(); 
}