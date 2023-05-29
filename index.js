const data = [
    { year: 2011, value: 45 },
    { year: 2012, value: 47 },
    { year: 2013, value: 52 },
    { year: 2014, value: 70 },
    { year: 2015, value: 75 },
    { year: 2016, value: 78 },
  ];
  
  const width = 600;
  const height = 500;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3
    .select('#d3-container')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr('viewBox', [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);
  
    const xAxisTitle = svg
    .append('text')
    .attr('transform', `translate(${width / 2}, ${height - margin.bottom / 2 + 25})`)
    .style('text-anchor', 'middle')
    .text('Year')
    .attr('font-size', '20px')
    .attr('font-weight', 'bold');
  
  const yAxisTitle = svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', margin.left / 2 - 24)
    .style('text-anchor', 'middle')
    .text('Stock Price')
    .attr('font-size', '20px')
    .attr('font-weight', 'bold');
  
  svg
    .append('g')
    .attr('fill', 'steelblue')
    .selectAll('rect')
    .data(data.sort((a, b) => d3.ascending(a.value, b.value)))
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => y(0) - y(d.value))
    .attr('width', x.bandwidth())
    .attr('class', 'rectangle');
  
  function xAxis(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => data[i].year))
      .attr('font-size', '20px');
  }
  
  function yAxis(g) {
    g.attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr('font-size', '15px')
      .selectAll('.tick')
      .selectAll('text')
      .text((d) => `$${d}`);
  }
  
  svg.append('g').call(yAxis);
  svg.append('g').call(xAxis);
  svg.node();
  