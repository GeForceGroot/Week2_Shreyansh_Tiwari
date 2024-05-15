
async function filterPassedStudents(students: any[]) {
    try {
        const result: any[] = students.filter(student => student.grade >= 50);
        return result;
    } catch (error) {
        console.log(error)
    }
}


async function getStudentNames(students: any[]) {
    try {
        const result: any[] = []
        students.forEach(student => {
            result.push(student.name)
        });
        return result;
    } catch (error) {
        console.log(error)
    }
}
async function sortStudentsByGrades(students: any[]) {
    try {
        students.sort((a, b)=> a.grade - b. grade)
        return students;
    } catch (error) {
        console.log(error)
    }
}
async function getAverageAge(students: any[]) {
    try {
        var totalStudents = students.length;
        var totalGrade = 0;
        students.forEach(student => {
            totalGrade += student.grade
        });
        var result: number = totalGrade/totalStudents
        return result;
    } catch (error) {
        console.log(error)
    }
}



export { filterPassedStudents, getStudentNames, sortStudentsByGrades, getAverageAge }