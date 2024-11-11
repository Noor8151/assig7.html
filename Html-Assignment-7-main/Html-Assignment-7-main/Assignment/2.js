$(document).ready(function () {
  $("#marks-form").submit(function (event) {
    event.preventDefault(); // Prevent form submission

    // Get values of marks input fields
    const subject1 = parseFloat($("#subject1").val());
    const subject2 = parseFloat($("#subject2").val());
    const subject3 = parseFloat($("#subject3").val());

    // Calculate total marks
    const totalMarks = subject1 + subject2 + subject3;

    // Calculate percentage
    const percentage = (totalMarks / 300) * 100;

    // Determine grade based on percentage
    let grade = "";
    if (percentage >= 90) {
      grade = "A+";
    } else if (percentage >= 80) {
      grade = "A";
    } else if (percentage >= 70) {
      grade = "B";
    } else if (percentage >= 60) {
      grade = "C";
    } else if (percentage >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    // Display results
    $("#total-marks").text(totalMarks);
    $("#percentage").text(percentage.toFixed(2));
    $("#grade").text(grade);

    // Show the result div
    $("#result").show();
  });
});
