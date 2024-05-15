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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const pgConfig_1 = __importDefault(require("./pgConfig"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
// students array Alsoyou can take through postman 
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
app.get('/', (req, res) => {
    res.send('hello');
});
// 1. Create a POST api that will fetch the payload (list of items:[ ] ) to complete the requirement
app.post('/filterData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    const filteredData = [];
    try {
        for (let i = 0; i < items.length; i++) {
            const orders = items[i].OrderBlocks;
            // A.   FilterOut the Orders whose any OrderBlock’s LineNo is divisible by 3
            const result = orders.filter(obj => obj.lineNo % 3 === 0);
            filteredData.push(result);
        }
        for (const orderID of filteredData) {
            yield pgConfig_1.default.query('INSERT INTO orders (orderID) VALUES ($1)', [orderID]);
        }
        res.status(200).send('Data successfully inserted into database.');
    }
    catch (error) {
        console.error('Error inserting data into database:', error);
    }
}));
//  Playing with array functions 
app.post('/arryaFunction', (req, res) => {
    var { array } = req.body;
    // push function
    array.push(6);
    // Pop
    const poppedItem = array.pop();
    // Concat
    const newArray = array.concat([6, 7]);
    // LastIndexOf
    const index = array.lastIndexOf(3);
    // Splice
    const splicedArray = array.splice(1, 2);
    // Slice
    const slicedArray = array.slice(1, 3);
    // replace
    const replacedString = array.replace(1, 9);
    // IndexOf
    const indexOfItem = array.indexOf(2);
    res.send(array);
});
//  students array's api
//  1. passed students
app.get('/filterPassedStudents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, service_1.filterPassedStudents)(students));
}));
// 2. students name
app.get('/getStudentNames', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, service_1.getStudentNames)(students));
}));
//  3. sort array of students
app.get('/sortStudentsByGrades', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, service_1.sortStudentsByGrades)(students));
}));
//  4. Avg of total grade
app.get('/getAverageAge', (req, res) => {
    res.send((0, service_1.getAverageAge)(students));
});
//  Get the all data from database
app.get('/getData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM orders';
    const result = yield pgConfig_1.default.query(query);
    return result;
}));
app.listen(port, () => {
    console.log('server is running on http://localhost:8000');
});
//# sourceMappingURL=app.js.map