const PROCESS_BTN = document.getElementById('process');
const COPY_BTN = document.getElementById('copy');
const SELECT_BTN = document.getElementById('selectedFile');
const file = document.querySelector('#selectedFile');
const reader = new FileReader();

SELECT_BTN.addEventListener(
  'click',
  () => (document.getElementById('jsonText').innerText = ''),
);
PROCESS_BTN.addEventListener('click', processFile);
COPY_BTN.addEventListener('click', copyJsonText);

function processFile() {
  const selectedFile = file.files[0];
  console.log('processing...');

  if (selectedFile) {
    reader.addEventListener('error', () => {
      console.error(`Error occurred reading file: ${selectedFile.name}`);
    });

    reader.addEventListener('load', () => {
      console.log(`File: ${selectedFile.name} read successfully`);
    });
    reader.readAsText(selectedFile);
  }

  let result = [];
  let header = [];
  //When the file finish load
  reader.onload = function (event) {
    let csv = event.target.result;
    let rows = csv.split(';;');

    for (let i = 0; i < rows.length; i++) {
      cols = rows[i].split('||');

      let obj = {};
      for (let j = 0; j < cols.length; j++) {
        // console.log(cols[j]);
        let value = escapeRegExp(cols[j]);
        //make a header arr
        if (i === 0) {
          header[j] = value;
        } else {
          if(j === 6 || j === 8) {
            value = makeCharToArr(value)
          }
          obj[header[j]] = value;
        }
      }
      if (i !== 0) {
        result.push(obj);
      }
    }
    document.getElementById('jsonText').innerText = JSON.stringify(result);
  };
}

function escapeRegExp(str) {
  return str.replace(/^[,\r\n]|,$/gm, '');
}

function makeCharToArr(str) {
  let arr = [];
  if(str !== '') {
    str = str.replace(/"/gm, '');
    arr = str.split(',');
  }

  return arr;
}

function copyJsonText() {
  let copyText = document.getElementById('jsonText');

  copyText.select();
  copyText.setSelectionRange(0, copyText.value.length);
  document.execCommand('copy');

  alert('Yay:D Copied to your Clipboard!');
}
