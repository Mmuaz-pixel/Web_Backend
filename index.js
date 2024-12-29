import express from 'express'; 
import initiateApp from './initiateApp.js';
import router from './routes/index.js';
const app = express(); 

initiateApp(app); 

app.get('/', (req, res)=>{
  return res.json({message: 'Server is up and running'});
})

app.use('/api', router); 