document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const savedElements = document.getElementById('savedElements');
  
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      saveElement(data);
    });
  
    function saveElement(data) {
      chrome.storage.local.get({elements: []}, function(result) {
        const elements = result.elements;
        elements.push(data);
        chrome.storage.local.set({elements: elements}, function() {
          displayElements();
        });
      });
    }
  
    function displayElements() {
      chrome.storage.local.get({elements: []}, function(result) {
        savedElements.innerHTML = '';
        result.elements.forEach((element, index) => {
          const div = document.createElement('div');
          if (element.type === 'text') {
            div.textContent = element.content;
          } else if (element.type === 'link') {
            const a = document.createElement('a');
            a.href = element.content;
            a.textContent = element.content;
            a.target = '_blank';
            div.appendChild(a);
          } else if (element.type === 'image') {
            const img = document.createElement('img');
            img.src = element.content;
            img.style.maxWidth = '100%';
            div.appendChild(img);
          }
          savedElements.appendChild(div);
        });
      });
    }
  
    displayElements();
  });
  console.log("hhhhhh");

  document.addEventListener('dragstart', function(event) {
    let data = {
      type: 'text',
      content: event.target.innerText
    };
  
    if (event.target.tagName === 'A') {
      data = {
        type: 'link',
        content: event.target.href
      };
    } else if (event.target.tagName === 'IMG') {
      data = {
        type: 'image',
        content: event.target.src
      };
    }
  
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  });
  
  