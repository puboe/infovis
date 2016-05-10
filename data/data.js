var litresHistChart  = dc.barChart("#chart-hist-litres"),
    stationsRowChart = dc.rowChart("#chart-row-stations"),
    litrePriceHistChart = dc.lineChart("#chart-litre-price"),
    refuelsPerMonthChart = dc.lineChart("#chart-refuels-per-month"),
    refuelsPerDayChart = dc.rowChart("#chart-refuels-per-day"),
    dataTable = dc.dataTable("#dc-table-graph");


d3.json("http://bananastic.ddns.net:3002/refuels.json", 
        function(err, data) {
            if (err != null) {
              alert("Hey! Something went wrong")
            } else {
              show(data)
            }
      });

function show(data) {

    data.forEach(function(elem) {
        elem.date = new Date(elem.created_at);
    })
    
    // Set crossfilter
    var cf = crossfilter(data),
        stationDim = cf.dimension(function(d) { return d.station }),
        refuelsPerStation = stationDim.group().reduceCount(),
        idDim = cf.dimension(function(d) { return d.id }),
        dateDim = cf.dimension(function(d) { return d.date }),
        litresPerDate = idDim.group().reduceSum(function(d) { return d.litres }),
        litrePrice = dateDim.group().reduceSum(function(d) { return (d.amount/d.litres) }),
        monthDim = cf.dimension(function(d) { return d3.time.month(d.date) }),
        refuelsPerMonth = monthDim.group().reduceCount(),
        dayDim = cf.dimension(function (d) {
                    var day = d.date.getDay();
                    switch (day) {
                      case 0:
                        return "Dom";
                      case 1:
                        return "Lun";
                      case 2:
                        return "Mar";
                      case 3:
                        return "Mie";
                      case 4:
                        return "Jue";
                      case 5:
                        return "Vie";
                      case 6:
                        return "Sab";
                    }
                }),
        refuelsPerDay = dayDim.group()

    stationsRowChart
        .dimension(stationDim)
        .group(refuelsPerStation)
        .elasticX(true)
        .controlsUseVisibility(true);

    litresHistChart
        .dimension(idDim)
        .group(litresPerDate)
        .x(d3.scale.linear().domain(d3.extent(data, function(d) { return d.id })))
        .elasticY(true)
        .yAxisLabel("Litros")
        .controlsUseVisibility(true);

    litrePriceHistChart
        .dimension(dateDim)
        .group(litrePrice)
        .x(d3.time.scale().domain(d3.extent(data, function(d) { return (d.date) })))
    	.yAxisLabel("Precio")
        .elasticY(true)
        .controlsUseVisibility(true)
        .xAxis().tickFormat(function(v) { return formatDate2(v); });

    refuelsPerMonthChart
        .dimension(monthDim)
        .group(refuelsPerMonth)
        .elasticY(true)
        .yAxisLabel("Cantidad")
        .x(d3.time.scale().domain(d3.extent(data, function(d) { return (d.date) })))
        .controlsUseVisibility(true)
        .xAxis().tickFormat(function(v) { return formatDate2(v); });

    refuelsPerMonthChart.yAxis().ticks(6);

    refuelsPerDayChart
        .dimension(dayDim)
        .group(refuelsPerDay)
        .controlsUseVisibility(true);


    // Table of earthquake data
    dataTable
        .dimension(dateDim)
        .group(function(d) { return "<b>" + d.station + "</b>"
        })
        .size(25)
        .columns([
            function(d) { return formatDate(d.date); },
            function(d) { return d.station; },
            function(d) { return "$" + d.amount; },
            function(d) { return d.litres + " lt"; },
            function(d) { return "$" + (d.amount/d.litres).toFixed(2); }, 
        ])
    .sortBy(function(d){ return d.date; })
    .order(d3.ascending);

    // litresHistChart.xAxis().tickFormat(function(d) { return d * 10 }); // convert back to base unit
    // litresHistChart.yAxis().ticks(15);

    dc.renderAll();
}

function formatDate(date) {
    return formatNumber(date.getDate()) + "-" + formatNumber(date.getMonth()+1) + "-" + (date.getFullYear()%100);
}

function formatDate2(date) {
    return (date.getMonth()+1) + "/" + (date.getFullYear()%100)
}

function formatNumber(number) {
    return (number < 10 ? '0' : '') + number;
}
