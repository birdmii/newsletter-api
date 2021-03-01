const PROCESS_BTN = document.getElementById('process');
const COPY_BTN = document.getElementById('copy');

PROCESS_BTN.addEventListener('click', processFile);
COPY_BTN.addEventListener('click', copyJsonText);

function processFile(){
  console.log('processing...');
  let file = document.querySelector('#selectedFile').files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  let result = [];
  let header = [];
  //When the file finish load
  reader.onload = function(event) {

    let csv = event.target.result;
    let rows = csv.split(';');

    for (let i = 0; i < rows.length; i++) {
      cols = rows[i].split('||');

      let obj = {};
      for (let j = 0; j < cols.length; j++) {
        let value = escapeRegExp(cols[j]);
        //make a header arr
        if(i === 0) {
          header[j] = value;
        } else {
          obj[header[j]] = value;
        }
      }
      if(i !== 0) {
        result.push(obj);
      }
    }
    document.getElementById('jsonText').innerText = JSON.stringify(result);
  }
}

function escapeRegExp(str) {
  return str.replace(/^[,\r\n]|,$/gm, ''); 
}

function copyJsonText() {
  let copyText = document.getElementById("jsonText");

  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  document.execCommand("copy");

  alert("Yay:D Copied to your Clipboard!");
}