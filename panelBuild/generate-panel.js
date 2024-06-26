const fs = require('node:fs');
const fsasync = require('fs').promises;

const metricElement = {
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

const iconElement = {
  "config": {
    "path": {
      "mode": "fixed",
      "fixed": "img/icons/unicons/0-plus.svg"
    },
    "fill": {
      "fixed": "#D9D9D9"
    }
  },
  "background": {
    "color": {
      "fixed": "transparent"
    }
  },
  "placement": {
    "top": 100,
    "height": 100,
    "left": 100,
    "width": 100
  },
  "type": "icon",
  "name": "Element 1",
  "constraint": {
    "vertical": "top",
    "horizontal": "left"
  },
  "border": {
    "color": {
      "fixed": "dark-green"
    }
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

const iconBasepath = "img/icons/marker/"

async function buildIcons() {
  let icons = await csvJSON('./icons.csv');

  icons.forEach(function (icon) {
    let element = { ...iconElement };

    element.config.path.fixed = iconBasepath + icon.path;
    element.placement.top = parseFloat(icon.top);
    element.placement.left = parseFloat(icon.left);
    element.placement.height = parseFloat(icon.height);
    element.placement.width = parseFloat(icon.width);
    element.name = icon.name;

    elements.push(element);
  });
  console.log(elements);
}

async function csvJSON(path) {
  const data = await fsasync.readFile(path, 'utf-8');

  const lines = data.split("\n");
  const headers = lines[0].split(",");

  let result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j].trim();
    }

    result.push(obj);
  }

  return result;
}


function buildMetrics() {
  metrics.forEach(function (metric) {
    let element = {...metricElement};

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
        if (metric.port == 1) { top += 160; }
        left = 80;
        if (metric.port > 1) { left += ((metric.port - 49) * 80) }
        break;
      case 'leaf2':
        top = 400;
        if (metric.port == 1) { top += 160; }
        left = 300;
        if (metric.port > 1) { left += ((metric.port - 49) * 80) }
        break;
      case 'leaf3':
        top = 400;
        if (metric.port == 1) { top += 160; }
        left = 660;
        if (metric.port > 1) { left += ((metric.port - 49) * 80) }
        break;
      default:
        throw new Error('Not supposed to reach default here');
    }
    element.placement.top = top;
    element.placement.left = left;
    elements.push(element);
  });
}

async function writeResult() {
  try {
    await fsasync.writeFile('./panel-elements-result.json', JSON.stringify(elements, null, 2));
    console.log("File written successfully");
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

(async function () {
  await buildIcons();
  buildMetrics();
  await writeResult();
})();