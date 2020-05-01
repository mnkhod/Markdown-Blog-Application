const express = require('express');
const router = express.Router();

const Article = require('./../models/article');

router.get('/new', (req , res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req,res) => {
  const a = await Article.findById(req.params.id);
  res.render('articles/edit', {article : a});
});

router.get('/:slug', async (req , res) => {
  let a = await Article.findOne({ slug: req.params.slug});

  if(a == null) res.redirect('/');

  res.render('articles/show' , { article : a });
});

router.post('/', async (req,res) => {
  let article = new Article({
    title : req.body.title,
    description : req.body.desc,
    markdown : req.body.markdown
  });
  
  try{
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render('articles/new' , { article: article })
  }

})

router.put('/:id', async (req , res) => {

  let article = await Article.findById(req.params.id);

  article.title = req.body.title;
  article.description = req.body.desc;
  article.markdown = req.body.markdown;

  try{
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render('articles/edit' , { article: article })
  }

});

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});


module.exports = router;
