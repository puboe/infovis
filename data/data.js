var data = d3.json("http://bananastic.ddns.net:3002/refuels.json", 
				function(err, data) {
  					if (err != null) {
  						alert("Hey! Something went wrong")
  					} else {
    					console.log(data)
    					show(data)
  					}
			});

function show(data) {
	
	console.log(data[0])

	var cf = crossfilter(data);

	console.log(cf)

	var dim = {};

	dim.litres = cf.dimension(function(d) { return d.id; });

	console.log(dim.litres)

	var charts = {};

	charts.litres = dc.barChart("#litres")
						.width(430)
						.height(300)
    					.dimension(dim.litres)
        				.group(dim.litres.group().reduceSum(function(d) { return d.litres }))
        				.elasticY(true)
    					.x(d3.scale.linear().domain(d3.extent(data, function(d) { return d.id; })))
					    .xAxis();

	charts.price = dc.barChart("#price")
						.width(430)
						.height(300)
    					.dimension(dim.litres)
        				.group(dim.litres.group().reduceSum(function(d) { return d.amount / d.litres }))
        				.elasticY(true)
    					.x(d3.scale.linear().domain(d3.extent(data, function(d) { return d.id; })))
					    .xAxis();


    dc.renderAll();
}

