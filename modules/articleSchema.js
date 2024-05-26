const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    metadata: {
        keywords: [String]
    },
    author:{   //foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    authorname:{
        type:String,
        required:true
    },
    category: { type:mongoose.Schema.Types.ObjectId, ref:'Category' },
    categoryname:{type:String,require:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;