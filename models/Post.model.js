const { Schema, model } = require('mongoose')

const schema = new Schema(
    {
        content: String,
        creatorId: { type: Schema.Types.ObjectId, ref: 'User'},
        picPath: String,
        picName: String,
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    },
    {
        timestamps: true
    }
)

module.exports = model('Post', schema)