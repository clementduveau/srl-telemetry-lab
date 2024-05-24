const fs = require('node:fs');

const baseElement = {
  "background": {
    "color": {
      "fixed": "#D9D9D9"
    }
  },
  "border": {
    "color": {
      "fixed": "dark-green"
    }
  },
  "constraint": {
    "horizontal": "left",
    "vertical": "top"
  },
  "type": "metric-value",
  "config": {
    "align": "center",
    "color": {
      "fixed": "#000000"
    },
    "size": 12,
    "text": {
      //      "field": "leaf1:ethernet-1/1:out",
      "fixed": "",
      "mode": "field"
    },
    "valign": "middle"
  },
  //  "name": "leaf1-1-out",
  "placement": {
    // "top": 566,
    "height": 21,
    // "left": 87,
    "width": 72
  }
}

let metrics = [
  { source: 'leaf1', port: 1, dest: 'in' },
  { source: 'leaf1', port: 1, dest: 'out' },
  { source: 'leaf1', port: 49, dest: 'in' },
  { source: 'leaf1', port: 49, dest: 'out' },
  { source: 'leaf1', port: 50, dest: 'in' },
  { source: 'leaf1', port: 50, dest: 'out' },
  { source: 'leaf2', port: 1, dest: 'in' },
  { source: 'leaf2', port: 1, dest: 'out' },
  { source: 'leaf2', port: 49, dest: 'in' },
  { source: 'leaf2', port: 49, dest: 'out' },
  { source: 'leaf2', port: 50, dest: 'in' },
  { source: 'leaf2', port: 50, dest: 'out' },
  { source: 'leaf3', port: 1, dest: 'in' },
  { source: 'leaf3', port: 1, dest: 'out' },
  { source: 'leaf3', port: 49, dest: 'in' },
  { source: 'leaf3', port: 49, dest: 'out' },
  { source: 'leaf3', port: 50, dest: 'in' },
  { source: 'leaf3', port: 50, dest: 'out' },
  { source: 'spine1', port: 1, dest: 'in' },
  { source: 'spine1', port: 1, dest: 'out' },
  { source: 'spine1', port: 2, dest: 'in' },
  { source: 'spine1', port: 2, dest: 'out' },
  { source: 'spine1', port: 3, dest: 'in' },
  { source: 'spine1', port: 3, dest: 'out' },
  { source: 'spine2', port: 1, dest: 'in' },
  { source: 'spine2', port: 1, dest: 'out' },
  { source: 'spine2', port: 2, dest: 'in' },
  { source: 'spine2', port: 2, dest: 'out' },
  { source: 'spine2', port: 3, dest: 'in' },
  { source: 'spine2', port: 3, dest: 'out' }
]

let elements = [
]

metrics.forEach(function (metric, i) {
  let element = baseElement;

  element.config.text.field = metric.source + ':ethernet-1/' + metric.port + ':' + metric.dest;
  element.name = metric.source + '-' + metric.port + '-' + metric.dest;

  // Spine on top
  // Leaf on botom
  let top = 0;
  switch (metric.source) {
    case 'spine1':
      top = 50;
      left = (160 + (metric.port * 80));
      break;
    case 'spine2':
      top = 50;
      left = (450 + (metric.port * 80));
      break;
    case 'leaf1':
      top = 400;
      if(metric.port == 1){top += 160;}
      left = 80;
      if(metric.port > 1){left += ((metric.port - 49)*80)}
      break;
    case 'leaf2':
      top = 400;
      if(metric.port == 1){top += 160;}
      left = 300;
      if(metric.port > 1){left += ((metric.port - 49)*80)}
      break;
    case 'leaf3':
      top = 400;
      if(metric.port == 1){top += 160;}
      left = 660;
      if(metric.port > 1){left += ((metric.port - 49)*80)}
      break;
    default:
      throw new Error('Not supposed to reach default here');
      break;
  }
  element.placement.top = top;
  element.placement.left = left;
  elements.push({ ...element })
});

fs.writeFile('./panel-result.json', JSON.stringify(elements), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});