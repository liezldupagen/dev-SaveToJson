const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/', (req, res) => {
    let data = req.body;
    appendToFile(data, 'text/json');
    // res.send('Data Received: ' + JSON.stringify(data));
    res.status(204).send();
})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

const appendToFile = (jsonContent, contentType) => {
    let filePath = `${__dirname}\\test.json`

    // importing the fs module
    const fs = require("fs");

    try {
        if (!fs.existsSync(filePath)) {
            //file exists

            fs.writeFile(filePath, "[]", (error) => {
                // throwing the error
                // in case of a writing problem
                if (error) {
                    // logging the error
                    console.error(error);

                    throw error;
                }

                console.log(`${filePath} created correctly`);
            });
        }

        let credBody = fs.readFileSync(filePath, "utf-8");
        let creds = JSON.parse(credBody);
        creds.push(jsonContent);
        let data = JSON.stringify(creds);

        fs.writeFileSync(filePath, data, "utf-8");
    } catch (err) {
        console.error(err)
    }
}