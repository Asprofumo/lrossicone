var margin = { top: 20, right: 20, bottom: 20, left: 20 };  // i bordi dello sfondo

var width = 1000 - margin.left - margin.right;  // dimensione orizzontale dello sfondo
var height = 1000 - margin.top - margin.bottom; // dimensione verticale dello sfondo

var xScale;
var yScale;

//  utilizzo di `scale` della libreria d3.js per le dimensioni di sfondo
function findDomain(data) {

  var botx = d3.min(data, function (d) { return d.x });
  var botx2 = d3.min(data, function (d) { return d.x2 });
  var botx3 = d3.min(data, function (d) { return d.x3 });

  var topx = d3.max(data, function (d) { return d.x });
  var topx2 = d3.max(data, function (d) { return d.x2 });
  var topx3 = d3.max(data, function (d) { return d.x3 });

  var boty = d3.min(data, function (d) { return d.y });
  var boty2 = d3.min(data, function (d) { return d.y2 });
  var boty3 = d3.min(data, function (d) { return d.y3 });

  var topy = d3.max(data, function (d) { return d.y });
  var topy2 = d3.max(data, function (d) { return d.y2 });
  var topy3 = d3.max(data, function (d) { return d.y3 });

  var minX = Math.min(botx, botx2, botx3);
  var maxX = Math.max(topx, topx2, topx3);

  var minY = Math.min(boty, boty2, boty3);
  var maxY = Math.max(topy, topy2, topy3);

  xScale = d3.scaleLinear().domain([minX, maxX]).range([75, height - 75]);
  yScale = d3.scaleLinear().domain([minY, maxY]).range([75, height - 75]);
}

//  append dell'svg di sfondo sul body del documento html

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var movingFlies = svg.selectAll(".fly");
var hasShifted = 0; // flag che indica se è stata shiftata la posizione verticale od orizzontale delle zanzare

// questi counter servono a sincronizzare le posizioni attuali delle zanzare per poter eseguire correttamente gli shift

var clickPosition = 0; //counter for clicks
var shiftPosition = 0; //counter for Hs and Vs

//  effettiva creazione delle zanzare

d3.json("./data/dataset.json").then(function (data) {
  findDomain(data);
  movingFlies.data(data)
    .enter()
    .append("image")
    .attr("class", "fly")
    .attr('href', 'https://www.seekpng.com/png/full/14-141429_cartoon-fly-png-clip-black-and-white-download.png')
    .attr("x", function (d) { return xScale(d.x) })
    .attr("y", function (d) { return yScale(d.y) })
    .attr('width', 75)
    .attr('height', 75);
  clickPosition++;
});

//  funzione che regola gli spostamenti

function move() {
  movingFlies = svg.selectAll(".fly");
  movingFlies.on("click", gray);

  if (clickPosition === 0) {
    movingFlies.transition()
      .duration(500)
      .attr("x", function (d) { return xScale(d.x) })
      .attr("y", function (d) { return yScale(d.y) });
    clickPosition = 1;
    shiftPosition = 0;
  }
  else if (clickPosition === 1) {
    movingFlies.transition()
      .duration(500)
      .attr("x", function (d) { return xScale(d.x2) })
      .attr("y", function (d) { return yScale(d.y2) });
    clickPosition = 2;
    shiftPosition = 1;
  }
  else if (clickPosition === 2) {
    movingFlies.transition()
      .duration(500)
      .attr("x", function (d) { return xScale(d.x3) })
      .attr("y", function (d) { return yScale(d.y3) });
    clickPosition = 0;
    shiftPosition = 2;
  }
}

//  funzione che scurisce le zanzare qualora venissero cliccate

function gray() {
  d3.select(this)
    .attr("class", "deadFly") // questa operazione è in realtà inutile; pensavo potesse servire per uno sviluppo futuro che ho poi accantonato
    .style('filter', 'grayscale(100%)');;
}

//  funzione che delega ad altre due specifiche lo shifting orizzontale e verticale

function shift(e) {
  movingFlies = svg.selectAll(".fly");
  if (e.code === "KeyH")
    shiftHorizontal(shiftPosition);

  if (e.code === "KeyV")
    shiftVertical(shiftPosition);
}


function shiftHorizontal(c) {
  if (c === 0) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return width - xScale(d.x) });
      hasShifted = 1;
    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return xScale(d.x) });
      hasShifted = 0;
    }
  }
  else if (c === 1) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return width - xScale(d.x2) });
      hasShifted = 1;

    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return xScale(d.x2) });
      hasShifted = 0;
    }
  }
  else if (c === 2) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return width - xScale(d.x3) });
      hasShifted = 1;
    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("x", function (d) { return xScale(d.x3) });
      hasShifted = 0;
    }
  }
}

function shiftVertical(c) {
  if (c === 0) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return width - yScale(d.y) });
      hasShifted = 1;
    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return yScale(d.y) });
      hasShifted = 0;
    }
  }
  else if (c === 1) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return width - yScale(d.y2) });
      hasShifted = 1;
    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return yScale(d.y2) });
      hasShifted = 0;
    }
  }
  else if (c === 2) {
    if (hasShifted === 0) {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return width - yScale(d.y3) });
      hasShifted = 1;
    }
    else {
      movingFlies.transition()
        .duration(500)
        .attr("y", function (d) { return yScale(d.y3) });
      hasShifted = 0;
    }
  }
}

document.body.addEventListener("click", move);
document.body.addEventListener("keypress", shift);
