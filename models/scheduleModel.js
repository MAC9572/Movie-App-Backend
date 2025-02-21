import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({

               movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
               screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
               showTime: { type: String, required: true },
               showDate: { type: String, required: true },
            //    price: { type: Number, required: true },
               seatsAvailable: { type: Boolean, required: true },
            //    cancellationAvailable: { type: Boolean, required: true },

}, );


export const Schedule= mongoose.model('Schedule', scheduleSchema);



