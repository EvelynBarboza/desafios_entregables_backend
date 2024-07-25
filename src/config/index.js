const { error } = require('console')
const { connect } = require('mongoose')

exports.connectDB = () => {
    //connect('mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce'
    connect('mongodb://127.0.0.1:27017/e-commerce_bck'
)
.then(() => {
    console.log('DB connected')
})
.catch ((error) => {
    console.error('DB CONNECTION ERROR:', error)
});
}