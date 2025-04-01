import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3001


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (req, res) => {
    res.render('index.ejs');
});

app.post("/create-blog", (req, res) => {
    const newBlog = req.body;

    // Ensure blogs.json exists before reading
    if (!fs.existsSync('./public/blogs.json')) {
        fs.writeFileSync('./public/blogs.json', JSON.stringify([], null, 2));
    }

    // Read the existing blogs from blogs.json
    fs.readFile('./public/blogs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blogs.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        let blogs = [];
        if (data) {
            blogs = JSON.parse(data);
        }

        // Add the new blog to the array
        blogs.push(newBlog);

        // Write the updated blogs array back to blogs.json
        fs.writeFile('./public/blogs.json', JSON.stringify(blogs, null, 2), (err) => {
            if (err) {
                console.error('Error writing to blogs.json:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).send('Blog created successfully');
        });
    });
});

app.get('/create', (req, res) => {
    res.render('creating.ejs');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});