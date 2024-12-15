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
