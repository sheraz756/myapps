try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = document.querySelector('#note-textarea');
var instructions = document.querySelector('#recording-instructions');
var notesList = document.querySelector('ul#notes');

var noteContent = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if (!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
  }
};

recognition.onstart = function() {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if (event.error == 'no-speech') {
      instructions.text('No speech was detected. Try again.');
  };
}




document.querySelector('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
      noteContent += ' ';
  }
  recognition.start();
});


document.querySelector('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});



document.querySelector('#save-note-btn').on('click', function(e) {
  recognition.stop();

  if (!noteContent.length) {
      instructions.text('Could not save empty note. Please add a message to your note.');
  } else {
      saveNote(new Date().toLocaleString(), noteContent);

      noteContent = '';
      renderNotes(getAllNotes());
      noteTextarea.val('');
      instructions.text('Note saved successfully.');
  }

})


notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if (target.hasClass('listen-note')) {
      var content = target.closest('.note').find('.content').text();
      readOutLoud(content);
  }

  if (target.hasClass('delete-note')) {
      var dateTime = target.siblings('.date').text();
      deleteNote(dateTime);
      target.closest('.note').remove();
  }
});



function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();

  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 3;

  window.speechSynthesis.speak(speech);
}


function renderNotes(notes) {
  var html = '';
  if (notes.length) {
      notes.forEach(function(note) {
          html += `<li class="note">
      <p class="header">
        <span class="date">document.queryselector(.note.date)</span>
        <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
        <a href="#" class="delete-note" title="Delete">Delete</a>
      </p>
      <p class="content">document.queryselector(note.content)</p>
    </li>`;
      });
  } else {
      html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
  }
  notesList.html(html);
}


function saveNote(dateTime, content) {
  localStorage.setItem('note-' + dateTime, content);
}
