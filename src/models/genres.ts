import mongoose from "mongoose";
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});
const Genres = mongoose.model('Genre', genreSchema);
export default Genres;