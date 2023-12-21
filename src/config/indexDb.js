import { connect } from "mongoose"

const connectDb = async () => {
    await connect('mongodb+srv://ianmarco:ian240904@cluster0.tfejsks.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('Base de datos conectada')
}
export default connectDb 