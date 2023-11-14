// blog_index , blog_details, blog_create_get, blog_create_post, blog_delete


const blog = require('../models/users');
const Blog = require('../models/users');

const blog_index =(req, res) =>{
    blog.find().sort({createdAt: -1}) 
    // after doing this , you make sure you sort
    .then((result) =>{
    res.render('blogs/index',{title : 'All Blogs', blogs: result})
    })
    .catch((err) => {
      console.log(err);
    })
}

const blog_details = (req,res) =>{
    const id = req.params.id; 
  blog.findById(id)
   .then(result => {    
       res.render('blogs/details', { blog: result, title: 'Blog details' });  
   })    
   .catch(err => {      
       res.status(404).send('Blog not found');
   });
}

const blog_create_get =(req,res)=>{
    res.render("blogs/create",{title: 'Create a new Blog'});
}

const blog_create_post =(req,res)=>{
    const blog= new Blog(req.body);
blog.save()
.then((result)=> {
  res.redirect('/blogs');
})
.catch((err) => {
  console.log(err)
});
}

const blog_delete =(req,res)=>{
    const id = req.params.id;

  blog.findByIdAndDelete(id)
  .then(result =>{
    res.json({redirect:'/blogs'})
  })
  .catch(err =>{
    console.log(err);
  })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}