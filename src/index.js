const express = require('express');
const { specs, swaggerUi } = require('../swagger');
const app = express();
const PORT = 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});
app.get('/health-check', (req, res) => {
    res.json({ status: 'Server is running!' });
});
app.get('/api/users',(req,res)=>{
    res.json({message: 'List of users'})
})
app.set('/api/users',(req,res)=>{
    res.json({message: 'User created'})
})
app.use((req,res,next)=>{
    res.status(404).json({error: 'Not found'});
});
app.use((req,res,next)=>{
    res.status(500).json({error: 'Internal server error'});
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});