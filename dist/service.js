"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageAge = exports.sortStudentsByGrades = exports.getStudentNames = exports.filterPassedStudents = void 0;
function filterPassedStudents(students) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = students.filter(student => student.grade >= 50);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.filterPassedStudents = filterPassedStudents;
function getStudentNames(students) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = [];
            students.forEach(student => {
                result.push(student.name);
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getStudentNames = getStudentNames;
function sortStudentsByGrades(students) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            students.sort((a, b) => a.grade - b.grade);
            return students;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sortStudentsByGrades = sortStudentsByGrades;
function getAverageAge(students) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var totalStudents = students.length;
            var totalGrade = 0;
            students.forEach(student => {
                totalGrade += student.grade;
            });
            var result = totalGrade / totalStudents;
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAverageAge = getAverageAge;
//# sourceMappingURL=service.js.map