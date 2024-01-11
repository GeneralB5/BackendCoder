import {Schema,model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const productCollection = 'products'
const cartCollection = 'carts'
const userCollection = 'messages'
const userCollections = 'users'
const cartsSchema = new Schema({
    products:{
        type:Array,
        require:true,
    }
})
const userSchema = new Schema({
    messages:{
        type:Array,
        require:true
    },
    NameId:{
        type:String,
        require:true
    },
    date:{type:Date, default:Date.now}
})
const usersSchema= new Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:String,
    email:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const  prodsSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    id:String,
    status:{
        type:Boolean,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    }
})

cartsSchema.pre('findOne',function () {
    this.populate('products.id')
})
prodsSchema.plugin(mongoosePaginate)
const prodsModel = model(productCollection,prodsSchema)
const cartsModel = model(cartCollection,cartsSchema)
const userModel = model(userCollection,userSchema)
const usersModels=model(userCollections,usersSchema)
export  {prodsModel,cartsModel,userModel,usersModels}