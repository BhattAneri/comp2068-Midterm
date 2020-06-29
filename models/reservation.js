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
      quantityOfGuests: {
        type: Number,
        required: true // This must exist
      },
      restaurant: {
        type: String,
        required: true
      },
      dateAndTime: {
        type: Date,
        required: true,
        set: val => {
          return new Date(val);
        },
        get: val => {
          // return `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}T${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
          const date = val.toISOString();
          return date.substring(0, date.length - 1);
        }
      },
     
    }, {
      timestamps: true
    });
    

module.exports = mongoose.model('Reservation', ReservationSchema);