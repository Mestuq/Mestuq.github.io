// Function to load page content via AJAX
function loadContent(page) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', page, true);
  xhr.onload = function() {
    sleep(250);
      if (this.status === 200) {
          setActiveNavLink(page);
          document.getElementById('main-content').classList.add('animate__animated', 'animate__fadeOutDownBig', 'animate__fast');
          setTimeout(function() {
            document.getElementById('main-content').innerHTML = this.responseText;
            
            document.getElementById('main-content').classList.remove('animate__fadeOutDownBig', 'animate__fast');
            document.getElementById('main-content').classList.add('animate__fadeInDownBig', 'animate__fast');
          }.bind(this), 500);
      }
  };
  xhr.send();
}

// Function to set the clicked nav link as active
function setActiveNavLink(page) {
  const navLinks = document.querySelectorAll('.btn');

  navLinks.forEach(link => {
      // Remove 'btn-selected' class from all buttons
      link.classList.remove('btn-selected');

      // Add 'btn-selected' class to the link that matches the page
      if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(page)) {
          link.classList.add('btn-selected');
      }
  });

  // Update the hash without reloading the page
  const hash = page.replace('.html', '');
  window.location.hash = hash;
}

// Function to load content based on the hash in the URL
function loadContentFromHash() {
  let page = window.location.hash.replace('#', '') || 'home';
  page = page.toLowerCase() + '.html'; // Convert to lowercase and add .html extension
  loadContent(page);
}

// Function to load project details via AJAX (same as before)
function loadProjectDetails(projectId) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `projects/${projectId}.html`, true);
  xhr.onload = function() {
      if (this.status === 200) {
          document.getElementById('project-detail').innerHTML = this.responseText;
          document.getElementById('project-modal').style.display = 'flex';
          // Add animation classes when opening the modal
          document.getElementById('project-modal').classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
          document.querySelector('#project-modal .modal-content').classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
          // Clear the timeout when opening a new modal
          clearTimeout(modalTimeout);
      }
  };
  xhr.send();
}

// Variable to store the timeout
let modalTimeout;

// Function to close the modal (same as before)
function closeModal() {
  // Remove animation classes when closing the modal
  document.getElementById('project-modal').classList.remove('animate__animated', 'animate__fadeIn', 'animate__faster');
  document.getElementById('project-modal').classList.add('animate__animated', 'animate__fadeOut', 'animate__faster');
  document.querySelector('#project-modal .modal-content').classList.remove('animate__animated', 'animate__fadeInDown', 'animate__faster');
  document.querySelector('#project-modal .modal-content').classList.add('animate__animated', 'animate__fadeOutUp', 'animate__faster');
  // Clear the previous timeout
  clearTimeout(modalTimeout);
  // Set a new timeout to close the modal
  modalTimeout = setTimeout(function() {
    document.getElementById('project-modal').style.display = 'none';
    document.getElementById('project-detail').innerHTML = "";
    // Remove animation classes after closing the modal
    document.getElementById('project-modal').classList.remove('animate__animated', 'animate__fadeOut', 'animate__faster');
    document.querySelector('#project-modal .modal-content').classList.remove('animate__animated', 'animate__fadeOutUp', 'animate__faster');
  }, 300);
}

// Load content based on the hash when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadContentFromHash();

  // Listen for hash changes and load the appropriate content
  window.addEventListener('hashchange', loadContentFromHash);

  // Close modal on outside click
  document.getElementById('project-modal').addEventListener('click', function(e) {
    if (e.target.id === 'project-modal') {
      closeModal();
    }
  });
});

// Function to open URL in a new tab
function openUrlInNewTab(url) {
  var a = $('<a>', { href: url, target: '_blank' })[0];

  var event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
  });

  a.dispatchEvent(event);
}

// Get all the buttons and add click event listeners to ensure the correct button is selected
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the selected class from all buttons
    buttons.forEach(btn => btn.classList.remove('btn-selected'));
    
    // Add the selected class to the clicked button
    button.classList.add('btn-selected');
  });
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}