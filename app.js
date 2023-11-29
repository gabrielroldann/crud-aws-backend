
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

const supabaseClient = require("@supabase/supabase-js");

const supabaseURL = "https://qslkorlvyszukjaeltpt.supabase.co";
const supabaseSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbGtvcmx2eXN6dWtqYWVsdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExOTI0MzEsImV4cCI6MjAxNjc2ODQzMX0.BcZeMcopFJAjL77iPtYcUk-BeFMwdgAKN0A5zeX1lqM";

const supabase = supabaseClient.createClient(supabaseURL, supabaseSecret);

const app = express();


app.use(cors(corsOptions)) 
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/products', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
    res.send(data);
    console.log(`lists all products ${data}`);
});

app.get('/products/:id', async (req, res) => {
    console.log("id = " + req.params.id);
    const {data, error} = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id)
    res.send(data);

    console.log("retorno "+ data);
});

app.post('/products', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
    if (error) {
        res.send(error);
        console.log(error)
    }
    res.send("created!!");
    console.log("retorno "+ req.body.name);
    console.log("retorno "+ req.body.description);
    console.log("retorno "+ req.body.price);

});

app.put('/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/products/:id', async (req, res) => {
    console.log("delete: " + req.params.id);
    const {error} = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")
    console.log("delete: " + req.params.id);

});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});