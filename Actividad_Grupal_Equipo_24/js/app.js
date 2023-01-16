const graf = d3.select("#graf")

const margins = { left: 75, top: 40, right: 75, bottom: 50 }
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

const col = d3.select("#col")

const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")

const fondo = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

fondo
  .append("rect")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("class", "grupo")

const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

const gDesempleados = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

const gEmpleados = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

// Data
let data = [
  {
    "Year": 2002,
    "Desempleados": 8684.5,
  },
  {
    "Year": 2003,
    "Desempleados": 9068.7,
  },
  {
    "Year": 2004,
    "Desempleados": 8934.1,
  },
  {
    "Year": 2005,
    "Desempleados": 7734.2,
  },
  {
    "Year": 2006,
    "Desempleados": 7363.5,
  },
  {
    "Year": 2007,
    "Desempleados": 7384.6,
  },
  {
    "Year": 2008,
    "Desempleados": 10383.7,
  },
  {
    "Year": 2009,
    "Desempleados": 16614.2,
  },
  {
    "Year": 2010,
    "Desempleados": 18560.6,
  },
  {
    "Year": 2011,
    "Desempleados": 20050.7,
  },
  {
    "Year": 2012,
    "Desempleados": 23244.1,
  },
  {
    "Year": 2013,
    "Desempleados": 24204.5,
  },
  {
    "Year": 2014,
    "Desempleados": 22441.6,
  },
  {
    "Year": 2015,
    "Desempleados": 20223.9,
  },
  {
    "Year": 2016,
    "Desempleados": 17924.7,
  },
  {
    "Year": 2017,
    "Desempleados": 15667.7,
  },
  {
    "Year": 2018,
    "Desempleados": 13916.5,
  },
  {
    "Year": 2019,
    "Desempleados": 12991.1,
  },
  {
    "Year": 2020,
    "Desempleados": 14123.7,
  },
  {
    "Year": 2021,
    "Desempleados": 13718.2,
  },
  {
    "Year": 2022,
    "Desempleados": 9074.3,
  }
]

let columnas = Object.keys(data[0])
let columna = 'Desempleados'

// Escaladores
const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.Desempleados)])
  .range([alto, 0])

const x = d3
  .scaleBand()
  .domain(d3.map(data, (d) => d.Year))
  .range([0, ancho])
  .paddingInner(0.2)
  .paddingOuter(0.1)

const color = d3
  .scaleOrdinal()
  .domain(columnas)
  .range(d3.schemeSet2)

// Ejes
const xAxis = d3.axisBottom(x)
const xAxisGroup = g
  .append("g")
  .attr("class", "ejes")
  .attr("transform", `translate(0, ${alto})`)
  .call(xAxis)

  g.append("text")
    .attr("x", ancho / 2)
    .attr("y", alto + 40)
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Años")
  
    g.append("g")
    .attr("transform", `translate(0, ${alto / 2})`)
    .append("text")
    .attr("y", -58)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Desempleo (Personas)")

const yAxis = d3.axisLeft(y)
const yAxisGroup = g.append("g").attr("class", "ejes").call(yAxis)

col
  .selectAll("option")
  .data(columnas.slice(1))
  .enter()
  .append("option")
  .attr("value", (d) => d)
  .text((d) => d)

  // Función Render
  const render = () => {
    const rect = g
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => {
          enter
            .append("rect")
            .attr("x", (d) => x(d.Year))
            .attr("y", (d) => y(0))
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .attr("fill", "#0077b6")
            .transition()
            .duration(2000)
            .attr("y", (d) => y(d[columna]))
            .attr("height", (d) => alto - y(d[columna]))
            .attr("fill", color(columna))
        },
        (update) => {
          y.domain([0, d3.max(data, (d) => d[columna])])
          yAxisGroup.transition().duration(2000).call(d3.axisLeft(y))
  
          return update
            .transition()
            .duration(2000)
            .attr("y", (d) => y(d[columna]))
            .attr("height", (d) => alto - y(d[columna]))
            .attr("fill", color(columna))
        },
        (exit) => exit
      )
  }


render()