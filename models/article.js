const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const purify = require('dompurify')
const { JSDOM } = require('jsdom')

const pure = purify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

// Validate A Model
articleSchema.pre('validate', function(next){
  if(this.title){
    this.slug = slugify(this.title, {lower:true, strict:true})
  }

  if(this.markdown){
    this.sanitizedHtml = pure.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = mongoose.model('Article',articleSchema);
