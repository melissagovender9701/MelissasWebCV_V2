const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', requestFile);

// Temp: use a proxy to avoid CORS issues (this should be set correctly on our server)
const serverURL = 'https://netlife-cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

// Use data from local storage
localStorage.setItem('reduxPersist:@WIZARD_STATE', 'testdata');
const localStorageData = localStorage.getItem('wizard');
console.log(localStorageData);

function requestFile() {
  axios({
    url: serverURL,
    method: 'GET', // TODO: change this to POST and use localStorageData
    responseType: 'blob' }).
  then(response => {
    createDownloadLink(response);
  }).
  catch(error => {
    console.log('This sucks. Debug please.');
  });
}

function createDownloadLink(response) {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'CV.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

