var litresHistChart  = dc.barChart("#chart-hist-litres"),
    stationsRowChart = dc.rowChart("#chart-row-stations"),
    litrePriceHistChart = dc.barChart("#chart-litre-price"),
    refuelsPerMonthChart = dc.barChart("#chart-refuels-per-month"),
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

    var totalLitres = 0, 
        totalRefuels = 0;

    data.forEach(function(elem) {
        elem.date = new Date(elem.created_at);
        totalLitres += elem.litres;
        totalRefuels++;
    })

    totalLitres = totalLitres.toFixed(0);
    
    // Set crossfilter
    var cf = crossfilter(data),
        stationDim = cf.dimension(function(d) { return d.station }),
        refuelsPerStation = stationDim.group().reduceCount(),
        dateDim = cf.dimension(function(d) { return d.date }),
        litresPerDate = dateDim.group().reduceSum(function(d) { return d.litres }),
        litrePrice = dateDim.group().reduceSum(function(d) { return (d.amount/d.litres) }),
        monthDim = cf.dimension(function(d) { return d3.time.month(d.date) }),
        refuelsPerMonth = monthDim.group().reduceCount(),
        dayDim = cf.dimension(function (d) {
                    var day = d.date.getDay();
                    switch (day) {
                      case 0:
                        return "0.Dom";
                      case 1:
                        return "1.Lun";
                      case 2:
                        return "2.Mar";
                      case 3:
                        return "3.Mie";
                      case 4:
                        return "4.Jue";
                      case 5:
                        return "5.Vie";
                      case 6:
                        return "6.Sab";
                    }
                }),
        refuelsPerDay = dayDim.group()

    var dateFormat = function(v) { return formatDate2(v); }

    stationsRowChart
        .dimension(stationDim)
        .group(refuelsPerStation)
        .elasticX(true)
        .controlsUseVisibility(true);

    litresHistChart
        .dimension(dateDim)
        .group(litresPerDate)
        .x(d3.time.scale().domain(d3.extent(data, function(d) { return d.date })))
        .elasticY(true)
        .yAxisLabel("Litros")
        .controlsUseVisibility(true)
        .xAxis().tickFormat(dateFormat);

    litrePriceHistChart
        .dimension(dateDim)
        .group(litrePrice)
        .x(d3.time.scale().domain(d3.extent(data, function(d) { return (d.date) })))
    	.yAxisLabel("Precio")
        .elasticY(true)
        .centerBar(true)
        .controlsUseVisibility(true)
        .xAxis().tickFormat(dateFormat);

    refuelsPerMonthChart
        .dimension(monthDim)
        .group(refuelsPerMonth)
        .elasticY(true)
        .yAxisLabel("Cantidad")
        .centerBar(true)
        .x(d3.time.scale().domain(d3.extent(data, function(d) { return (d.date) })))
        .controlsUseVisibility(true)
        .xAxis().tickFormat(dateFormat);

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

    d3.selectAll("#total-refuels")
        .text("Cantidad de cargas: " + parseInt(totalRefuels).toLocaleString('es'));

    d3.selectAll("#total-litres")
        .text("Cantidad de litros: " + parseInt(totalLitres).toLocaleString('es'));
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
