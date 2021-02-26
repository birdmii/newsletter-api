const PROCESS_BTN = document.getElementById('process');
const COPY_BTN = document.getElementById('copy');

PROCESS_BTN.addEventListener('click', processFile);
COPY_BTN.addEventListener('click', copyJsonText);

function processFile(){
  console.log('processing...');
  let file = document.querySelector('#selectedFile').files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  //if you need to read a csv file with a 'ISO-8859-1' encoding
  /*reader.readAsText(file,'ISO-8859-1');*/
  let JSONTEXT = "";
  let result = [];
  let header = [];
  //When the file finish load
  reader.onload = function(event) {

    //get the file.
    let csv = event.target.result;
    //split and get the rows in an array
    let rows = csv.split(';');

    //move line by line
    for (let i = 0; i < rows.length; i++) {
      //split by separator (,) and get the columns
      cols = rows[i].split('||');

      //move column by column
      let obj = {};
      for (let j = 0; j < cols.length; j++) {
        /*the value of the current column.
        Do whatever you want with the value*/
        let value = escapeRegExp(cols[j]);
        //make a header arr
        if(i === 0) {
          header[j] = value;
        } else {
          console.log(header[j], value);
          // if(j === 8) {
          //   value = changeArr(cols[j]);
          // } 
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

function escapeRegExp(string) {
  return string.replace(/^[,\r\n]|,$/gm, ''); // $& means the whole matched string
}

function changeArr(string) {
  let categoriesArr = [];
  arr = string.split(',');
  for(let i = 0 ; i < arr.length ; i++) {
    let item = '"' + arr[i] + '"';
    categoriesArr.push(item);
  }
  return categoriesArr;
}

function copyJsonText() {
  /* Get the text field */
  let copyText = document.getElementById("jsonText");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Yay:D Copied to your Clipboard!");
}