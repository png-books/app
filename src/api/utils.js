const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-';

export async function uploadFiles1(files) {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append('file', files[i].data)
    data.append('years', files[i].year || 0);
  }
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
  }
  reader.readAsText(file);
}

export function xmlToJson(xml) {
  var obj = {};
  if (xml.nodeType == 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    obj = xml.nodeValue;
  }

  var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}


export function randomString(length) {
  const randomInt = (min = 0, max = 1) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
  return Array.from({ length: length }).map(() => CHARS[randomInt(0, CHARS.length)]).join('');
}

export async function uploadFiles(fileData) {
  const dataArray = {};
  for (const file of fileData) {
    console.log(file);
    readFile(file.data);
    //dataArray[file.year] = await parseFile(file.data);
  }
  return dataArray;
}

export default {
  uploadFiles,
  randomString,
  xmlToJson
}