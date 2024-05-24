let elements = [
  {
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
    "config": {
      "align": "center",
      "color": {
        "fixed": "#000000"
      },
      "size": 12,
      "text": {
        "field": "leaf1:ethernet-1/1:out",
        "fixed": "",
        "mode": "field"
      },
      "valign": "middle"
    },
    "constraint": {
      "horizontal": "left",
      "vertical": "top"
    },
    "name": "leaf1-1-out",
    "placement": {
      "top": 566,
      "height": 21,
      "left": 87,
      "width": 72
    },
    "type": "metric-value"
  }
]

let metrics= []

const source=[
  "leaf1",
  "leaf2",
  "leaf3",
  "spine1",
  "spine2"
]

const port = [
  1,2,3,49,50
]

const dest = [
  "in",
  "out"
]

source.forEach(s => {
  let el = { source: s };

  port.forEach(p => {
    el.port = p;

    dest.forEach(d => {
      el.dest = d;

      metrics.push({...el});
    });
  })
});

console.log(metrics);