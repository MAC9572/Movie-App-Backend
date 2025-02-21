import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
      movie_image : {type :String},
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 20,
            maxLength: 500,
        },
        movie_grade :{
          type : String,
          required : true
        },
        languages : {
          type : String,
          required :true
        },
        duration: {
            type: String,
            required: true
        },
        genre :{
         type : String,
         required : true
        },
        // rating : {
        //     percentage: { type: mongoose.Schema.Types.ObjectId , ref :"Movie" },
        //     no_of_ratings: {type: mongoose.Schema.Types.ObjectId , ref :"Movie"}
        // },
        cast: [
            {
              original_name: { type: String, required: true },
              character: { type: String, required: true },
              // cast_image: { type: String},
            },
          ],
          crew: [
            {
              name: { type: String, required: true },
              crew_position: { type: String, required: true },
              // crew_image: { type: String},
            },
          ],
        theatre_admin: { type: mongoose.Types.ObjectId, ref: "Admin" },
    },
    { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);