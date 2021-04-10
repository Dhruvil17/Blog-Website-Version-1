const express = require("express");
const _ = require("lodash"); 
const ejs = require("ejs");

const homeStartingContent = "Hey There! Welcome to the DAILY JOURNAL. Now you can keep publish all your Blog Posts here on this Website and can read them. You can publish as many posts as you want. Head over to the COMPOSE A POST Section and publish your first Post in this Website. For any suggestions or queries feel free to head over to the CONTACT ME Section and also let us get connected. To contact with me head over to the ABOUT ME Section.";
const aboutContent = "My name is Dhruvil Soni and I am currently in my 2nd year of B.Tech and I have made this Website as a part of my learning process of EJS, NODE, EXPRESS and other Technologies. You can find my Contact details below. Feel free to reach out to me for any queries or suggestion to improve this Website.";
const contactContent = "You can contact me about any Suggestion regarding any design of the Website or the bug fixes or also for improving any part of the Website.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", { homePageContent: homeStartingContent, allPosts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutPageContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactPageContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:post", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.post);

  posts.forEach(function (post) {
    const postTitle = _.lowerCase(post.title);
    if(postTitle === requestedTitle)
    {
      res.render("post", { postContent1: post.title, postContent2: post.content });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
