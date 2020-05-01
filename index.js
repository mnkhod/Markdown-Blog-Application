const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const method = require('method-override');
const app = express();


// MONGODB
mongoose.connect('mongodb+srv://mnkhod:981014@zaanaa-db-ka8ey.azure.mongodb.net/markdown?retryWrites=true&w=majority', { 
  useNewUrlParser : true , 
  useUnifiedTopology: true ,
  useCreateIndex: true
});


// Routers
const articleRouter = require('./routes/articles');

app.set('view engine','ejs');
// get post body request data
app.use(express.urlencoded( { extended : false } ));



// Middleware For Router
app.use(method('_method'));
app.use('/articles', articleRouter);




// index route
app.get('/', async (req , res) => {
  let article_list = await Article.find().sort({createdAt: 'desc'});

  res.render('articles/index', { articles : article_list });
});

app.listen(5000);
