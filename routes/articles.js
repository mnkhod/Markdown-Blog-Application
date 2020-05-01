const express = require('express');
const router = express.Router();

const Article = require('./../models/article');

router.get('/new', (req , res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/:id', async (req , res) => {
  let a = await Article.findById(req.params.id);

  if(a == null) res.redirect('/');

  res.render('articles/show' , { article : a });
});

router.post('/', async (req,res) => {
  let article = new Article({
    title : req.body.title,
    description : req.body.description,
    markdown : req.body.markdown
  });
  
  try{
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render('articles/new' , { article: article })
  }

})



module.exports = router;
