var data = d3.json("http://bananastic.ddns.net:3002/refuels.json", 
				function(err, data) {
  					if (err != null) {
  						alert("Hey! Something went wrong")
  					} else {
    					// console.log(data)
    					show(data)
  					}
			});

function show(data) {
	
	var minDate, maxDate;

	data.forEach(function(elem) {
		elem.date = new Date(elem.created_at);
		if(minDate == undefined || minDate > elem.date) {
			minDate = elem.date;
		}
		if(maxDate == undefined || maxDate < elem.date) {
			maxDate = elem.date;
		}
	})

	var nestByStation = d3.nest().key(function(d) { return d.station }).entries(data);

	var cf = crossfilter(data);

	var litresDim = cf.dimension(function(d) { return d.date; });
	var litresGroup = litresDim.group().reduceSum(function(d) { return d.litres }),
		litresPriceGroup = litresDim.group().reduceSum(function(d) { return d.amount / d.litres })

	var litresChart = dc.barChart("#litres")
						.width(900)
						.height(300)
    					.dimension(litresDim)
        				.group(litresGroup)
        				// .elasticY(true)
    					.x(d3.time.scale().domain([minDate, maxDate.setMonth(maxDate.getMonth()+1)])
							.rangeRound([0, 10 * 90]))
    					.elasticX(true)
    					// .xAxis().ticks(5)

    					// .centerBar(true)
    					// .zoomScale(d3.extent(data, function(d) { return d.id; }))
    					// .mouseZoomable(true)
    					// .brushOn(false)
    					// .controlsUseVisibility(true)

    					// .renderHorizontalGridLines(true)
					    
					    // .colors(d3.scale.category20b())

	var priceChart = dc.barChart("#price")
						.width(930)
						.height(300)
    					.dimension(litresDim)
        				.group(litresPriceGroup)
        				.elasticY(true)
    					.x(d3.time.scale().domain([minDate, maxDate]))
					    .xAxis();


    dc.renderAll();
}

