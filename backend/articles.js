
const mongoose = require('mongoose');
const url = 'mongodb+srv://mackjoyner:bEsilIT1WcgEosNg@cluster0.8xaq1b7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(url);
const { Profile } = require("./auth");
const uploadImage = require('./uploadCloudinary');

var articleSchema = new mongoose.Schema({
  pid: Number, author: String, text: String, date: Date, comments: Array, image: String
});
const Article = mongoose.model('article', articleSchema);

const getArticles = (req, res) => {
  Profile.findOne({ username: req.user.username }).exec().then(profile => {
    const authorsToQuery = [req.user.username, ...profile.following];
    if (!req.params.id) {
      Article.find({ author: { $in: authorsToQuery } }).exec().then(articles => {
        if (!articles) {
          return res.status(404).json({ error: 'Article not found' });
        }
        let msg = { articles: articles };
        res.send(msg);
      });
    }
    else if (containsInteger(req.params.id)) {
      console.log("hello");
      Article.findOne({ pid: parseInt(req.params.id), author: { $in: authorsToQuery } }).exec().then(article => {
        console.log("deeper");
        if (!article) {
          return res.status(404).json({ error: 'Article not found' });
        }
        let msg = { articles: [article] };
        res.send(msg);
      });
    } else if (req.params.id !== req.user.username) {
      console.log("hello");
      if (authorsToQuery.includes(req.params.id)) {
        console.log(req.params.id);
        Article.find({ author: req.params.id }).exec().then(articles => {
          console.log("deeper");
          if (!articles) {
            return res.status(404).json({ error: 'Article not found' });
          }
          let msg = { articles: articles };
          res.send(msg);
        });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } else {
      console.log("hello");
      Article.find({ author: { $in: authorsToQuery } }).exec().then(articles => {
        console.log("deeper");
        if (!articles) {
          return res.status(404).json({ error: 'Article not found' });
        }
        let msg = { articles: articles };
        res.send(msg);
      });
    }
  });
}

function containsInteger(str) {
  return Number.isInteger(Number(str));
}

const updateArticle = (req, res) => {
  const { text, commentId } = req.body;
  const loggedInUser = req.user.username;
  const articleId = parseInt(req.params.id);

  Article.findOne({ pid: articleId }).exec().then(article => {
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (loggedInUser !== article.author) {
      // Check if the user owns the article
      return res.status(403).json({ error: 'Forbidden: You do not own this article' });
    }

    if (commentId !== undefined && commentId !== -1) {
      // Find the comment by ID
      const comment = article.comments.find(comment => comment.id === commentId);

      // Check if the comment exists
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if the user owns the comment
      if (comment.author !== loggedInUser) {
        return res.status(403).json({ error: 'Forbidden: You do not own this comment' });
      }

      // Update the comment text
      const commentIdx = article.comments.indexOf(comment);
      article.comments[commentIdx].text = text;
    }

    if (commentId === -1) {
      // Add a new comment
      const newComment = {
        pid: article.comments.length,
        author: loggedInUser,
        date: new Date().toUTCString(),
        text: text,
      };
      article.comments.push(newComment);
    }

    // Update the article text
    article.text = text;

    // Save the updated article
    article.save()
      .then(updatedArticle => {
        res.send({ articles: [updatedArticle] });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500); // Internal Server Error
      });
  });
};


const addArticle = (req, res) => {
  
  let post = {};
  
  post.author = req.user.username;
  post.date = new Date().getUTCMilliseconds();
  post.text = req.body.text;
  post.comments = [];
  console.log(post);
  Article.countDocuments({}).exec().then(count => {
    new Article({ pid: count, author: post.author, date: post.date, text: post.text, comments: post.comments, image: req.fileurl }).save().then(result => {
      Profile.findOne({ username: req.user.username }).exec().then(profile => {
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        const authorsToQuery = [req.user.username, ...profile.following];
      Article.find({author: { $in: authorsToQuery }}).exec().then(articles => {
        res.send({
          articles: articles
        });
      });
      });
    });
  });
}

module.exports = (app) => {
  app.get('/articles/:id?', getArticles);
  //app.post('/article', addArticle);
  app.post('/article', uploadImage('image'), addArticle);
  app.put('/articles/:id', updateArticle);
}

module.exports.Article = Article;