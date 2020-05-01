const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Routers
const articleRouter = require('./routes/articles');

// MONGODB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser : true , useUnifiedTopology: true });


app.set('view engine','ejs');
// get post body request data
app.use(express.urlencoded( { extended : false } ));



// Middleware For Router
app.use('/articles', articleRouter);




// index route
app.get('/', (req , res) => {
  let articles = [{
      title : 'Test Article',
      createdAt : new Date(),
      description : 'Test Description'
    },
    {
      title : 'Test Article2',
      createdAt : new Date(),
      description : 'Test Description2'
    },

  ];


  res.render('articles/index', { articles : articles });
});

app.listen(5000);
