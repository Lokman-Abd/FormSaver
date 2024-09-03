document.getElementById('saveData').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: saveFormData
      });
  });
});

document.getElementById('fillData').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: fillFormData
      });
  });
});

function saveFormData() {
  const formElements = [...document.forms].flatMap(form => [...form.elements]);
  const formData = {};

  formElements.forEach(el => {
      if (el.name && el.type !== 'hidden') {
          formData[el.name] = el.value;
      }
  });

  localStorage.setItem('savedFormData', JSON.stringify(formData));
  alert('Form data saved!');
}

function fillFormData() {
  const savedData = JSON.parse(localStorage.getItem('savedFormData'));

  if (savedData) {
      const formElements = [...document.forms].flatMap(form => [...form.elements]);

      formElements.forEach(el => {
          if (el.name && savedData[el.name]) {
              el.value = savedData[el.name];
          }
      });

      alert('Form data filled!');
  } else {
      alert('No saved form data found.');
  }
}