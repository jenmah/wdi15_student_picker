var Quizz = Quizz || {};
var View = View || {};

$(document).ready(function() {
  View.initialise();
});

View = {

  initialise: function() {
    // grabbing the DOM elements is fine now that the page has loaded
    View.leftDiv = $(document.createElement('div')).addClass('column student-column twenty-percent').attr('id', 'student-names');
    View.rightDiv = View.leftDiv.clone().attr('id', 'finised-students');
    View.ul: "<ul class='student-list'></ul>";
    View.h2: '<h2>Students</h2>';
    View.h2_2: '<h2>In The Clear</h2>';

    //  append elements to the right place in the page
    $('body').prepend(View.leftDiv).append(View.rightDiv);
    $('.student-column').append(View.ul);
    View.leftDiv.prepend(View.h2);
    View.rightDiv.prepend(View.h2_2);

    // add students to the list
    View.addStudents();
    // get ready to start the game
    $('button').one('click', Quizz.initialise);
  },

  addStudents: function() {
    Quizz.studentsArray.forEach(function(element, index){
      var li = "<li data-name='" + element + "'>" + element + "</li>";
      $('#student-names ul').append(li);
    })
  },

  highlightStudent: function(student) {
    View.studentHighlight = $('#student-names li[data-name="' + student + '"]');
    console.log('student high', View.studentHighlight);
    View.studentHighlight.addClass('highlight');
  }
};
// end of View object


Quizz = {

  studentsArray: ["Ambar", "Carryl", "Chris", "Christine", "Denis", "Gary", "Jack", "James", "Joshua", "Luke", "Mark", "Mike", "Max", "Niall", "Paco", "Rob", "Sam", "Yao"],
  questionsArray: ['a very hard question', 'how cool is Jeremy?', 'what is the age of the capitain?', 'JEEEEEEENNN'],

  initialise: function(){
    Quizz.pickRandomStudent();
    // add real Listener which will work for the rest of the game
    $('button').on('click', Quizz.nextStudent)    
  },

  pickRandomStudent: function(){
    // get random index
    var randomIndex = Math.floor(Math.random() * Quizz.studentsArray.length);
    var randomStudent = Quizz.studentsArray[randomIndex];
    // remove student from array
    Quizz.studentsArray.splice(randomIndex, 1);

    // highlight the randomStudent
    console.log('random', randomStudent);
    View.highlightStudent(randomStudent);
  },

  nextStudent: function(){
    // hide highlighted student and move it to the right
    View.studentHighlight.slideUp();
    View.studentHighlight.removeClass('highlight').appendTo($('#finised-students ul'));
    View.studentHighlight.hide().slideDown('slow');

    // re-run pickRandomStudent on new array
    Quizz.pickRandomStudent();
    // show new question
    Quizz.pickRandomQuestion();
  },

  pickRandomQuestion: function() {
    // get random index
    var randomIndex = Math.floor(Math.random() * Quizz.questionsArray.length);
    var randomQuestion = Quizz.questionsArray[randomIndex];
    // remove student from array
    Quizz.questionsArray.splice(randomIndex, 1);
    console.log('new array', Quizz.questionsArray);
    console.log(randomQuestion); 
    $('#question').text(randomQuestion);
  }
}
// end of Quizz object





