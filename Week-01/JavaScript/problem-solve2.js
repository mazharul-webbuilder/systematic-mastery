const students = [
    {
        name: "Zayaan",
        scores: [90, 98, 97]
    },
    {
        name: "Lammim",
        scores: [98, 98, 97]
    },
    {
        name: "Rakib",
        scores: [70, 98, 97]
    }
];

function getTopStudent(students) {

    let topStudent = null;

    students.forEach(function (student) {
        let totalScore = 0;
        student.scores.forEach(function (s) {
            totalScore += s
        })
        student.totalScore = totalScore
        // Fin top student
        topStudent = topStudent ?? student;
        if (topStudent.totalScore < totalScore){
            topStudent = student;
        }
    })
        console.log({topStudent})
}
getTopStudent(students);