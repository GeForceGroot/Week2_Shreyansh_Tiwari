import express, { Response, Request } from 'express';
import { filterPassedStudents, getStudentNames, sortStudentsByGrades, getAverageAge } from './service';
import {pool, createTableIfNotExists} from './pgConfig';

const app = express();

const port = 8000;
app.use(express.json());

// students array Alsoyou can take through postman 
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];

app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})


// 1. Create a POST api that will fetch the payload (list of items:[ ] ) to complete the requirement
app.post('/filterData', async (req: Request, res: Response) => {
    const { items } = req.body;
    const filteredData: any[] = [];

    try {
        for (let i = 0; i < items.length; i++) {
            const orders: any[] = items[i].OrderBlocks;

            // A.   FilterOut the Orders whose any OrderBlock’s LineNo is divisible by 3

            const result: any[] = orders.filter(obj => obj.lineNo % 3 === 0);
            filteredData.push(result);
        }

        for (const orderID of filteredData) {
            await pool.query('INSERT INTO orders (orderID) VALUES ($1)', [orderID]);
        }
        res.status(200).send('Data successfully inserted into database.');
    }
    catch (error) {
        console.error('Error inserting data into database:', error);
    }
});


//  Playing with array functions 

app.post('/arryaFunction', (req: Request, res: Response) => {
    var { array } = req.body;

    // push function
    array.push(6);

    // Pop
    const poppedItem: number | undefined = array.pop();

    // Concat
    const newArray: number[] = array.concat([6, 7]);

    // LastIndexOf
    const index: number = array.lastIndexOf(3);

    // Splice
    const splicedArray: number[] = array.splice(1, 2);

    // Slice
    const slicedArray: number[] = array.slice(1, 3);

    // replace
    const replacedString: string = array.replace(1, 9);

    // IndexOf
    const indexOfItem: number = array.indexOf(2);

    res.send(array)

})

//  students array's api

//  1. passed students

app.get('/filterPassedStudents', async (req: Request, res: Response) => {
    res.send(await filterPassedStudents(students));
})

// 2. students name

app.get('/getStudentNames', async (req: Request, res: Response) => {
    res.send(await getStudentNames(students));
})

//  3. sort array of students

app.get('/sortStudentsByGrades', async (req: Request, res: Response) => {
    res.send(await sortStudentsByGrades(students))
})

//  4. Avg of total grade

app.get('/getAverageAge',  (req: Request, res: Response) => {
    res.send(getAverageAge(students))
})
//  Get the all data from database

app.get('/getData', async (req: Request, res: Response) => {
    const query = 'SELECT * FROM orders';
    const result = await pool.query(query);
    return result;
})


//  check is table is alredy exists or not

app.get('/checkTable',async (req: Request, res: Response)=>{
    if(await createTableIfNotExists()){
        res.status(200)
    }else{
        res.status(404);
    }
})

app.listen(port, () => {
    console.log('server is running on http://localhost:8000')
})
