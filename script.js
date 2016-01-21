$(document).ready(function(){

  var studentHighlight;

  console.log('ready');
  // 1)  Page layout? What elements do we want to create? (answer: three divs, inline-block)
  // -> 3 divs: 1 for ul left with names; 1 middle click button get name and question ; 1 ul right names who played


  //2) How do we create the two side divs using jQuery?
  var leftDiv = $(document.createElement('div')).addClass('column student-column twenty-percent').attr('id', 'student-names');
  var rightDiv = leftDiv.clone().attr('id', 'finished-students');


  // 3) Why aren't they appearing on the page? (we need to append to the body!)
  $('body').prepend(leftDiv).append(rightDiv);


  // 3) How would you list the students?  (create a <ul> in the 2 students divs:)
  var ul = "<ul class='student-list'></ul>";  // faster to type but slower to run
  $('.student-column').append(ul); // adds to both divs in one line

  // 4) How do we add a title if we want it to appear before the <ul>? (<h2>Students</h2> and <h2>In the Clear</h2>)
  var h2 = '<h2>Students</h2>';
  var h2_2 = '<h2>In The Clear</h2>'
  leftDiv.prepend(h2);
  rightDiv.prepend(h2_2);

  // 5) Given a list of students, what would be the way to store that list and then append it on the page? (answer: iterate through studentsArray to add them all as an <li>)
  var studentsArray = ["Ambar", "Carryl", "Chris", "Christine", "Denis", "Gary", "Jack", "James", "Joshua", "Luke", "Mark", "Mike", "Niall", "Paco", "Rob", "Sam", "Yao"];

  // create a questions array
  var questionsArray = ["this is where a new question should go", 'testing2', 'fdfddf', 'JEEEEEEENNN'];

  // 6) which iterator would you use to loop through the array and append each name to an <li>?
  studentsArray.forEach(function(element, index){
    var li = "<li data-name='" + element + "'>" + element + "</li>";
    $('#student-names ul').append(li);
  })

  // 7) What do we need to create to fire off our events? (an event listener on the Click Me button)
  // Gui explains the .one function
  $('button').one('click', initGame);

  // we'll give them this
  function initGame() {
    pickRandomStudent();
    // add real Listener which will work for the rest of the game
    $('button').on('click', nextStudent)
  }

  // They created this with Lauren, so we'll just pick people to explain what each line is doing
  function pickRandomStudent() {
    // get random index
    var randomIndex = Math.floor(Math.random() * studentsArray.length);
    // store the student name
    var randomStudent = studentsArray[randomIndex];
    // remove student from array
    studentsArray.splice(randomIndex, 1);

    // highlight the randomStudent
    console.log('random', randomStudent);
    highlight(randomStudent);
  }


  // we'll take them through this
  function highlight(student){
    // show them in the console how to grab student
    studentHighlight = $('#student-names li[data-name="' + student + '"]');
    console.log('student high', studentHighlight);
    studentHighlight.addClass('highlight');
  }


  // 8) Ask someone what function needs to be created next?
  function nextStudent() {
    // hide highlighted student and move it to the right
    studentHighlight.slideUp();
    // remove that student's highlight class and append it to the finished-students <ul>
    studentHighlight.removeClass('highlight').appendTo($('#finished-students ul'));
    // have the name slideDown
    studentHighlight.hide().slideDown('slow');

    // 9) If we want everything to run off of the one button, what functions do we now need to call?
    // re-run pickRandomStudent on new array
    pickRandomStudent();
    // show new question
    pickRandomQuestion();
  }

  // same logic for picking a random question
  function pickRandomQuestion() {
    // get random index
    var randomIndex = Math.floor(Math.random() * questionsArray.length);
    var randomQuestion = questionsArray[randomIndex];
    // remove student from array
    questionsArray.splice(randomIndex, 1);
    console.log('new array', questionsArray);
    console.log(randomQuestion);
    $('#question').text(randomQuestion);
  }

})