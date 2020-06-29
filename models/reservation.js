// You need to define the schema for a reservation
// The fields you require are:
// associated user
// quantity of guests
// restaurant name
// date and time of reservation (you can do these as separate fields if you wish) 
const mongoose = require('mongoose');

// You need to create a new schema and assign it the following
// constant
const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      quantity: {
        type: Number,
        required: true // This must exist
      },
      restaurantname: {
        type: String,
        required: true
      },
     
    }, {
      timestamps: true
    });
    

module.exports = mongoose.model('Reservation', ReservationSchema);