// You need to complete this controller with the required 7 actions
const viewPath = 'reservations';
const Reservation = require('../models/reservation');
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
    const reservations = await Reservation
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Your Restaurant Reservations',
      reservations: reservations
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying your reservations: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('user');
    console.log(reservation);
    res.render(`${viewPath}/show`, {
      pageTitle: reservation.title,
     reservation:reservation
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying your reservation: ${error}`);
    res.redirect('/');
  }
};

const restaurants = [
    'Kelseys',
    'Montanas',
    'Harveys',
    'Swiss Chalet',
    'Outbacks'
  ];
exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Reservation',
    restaurants : restaurants
  });
};

exports.create = async (req, res) => {
  try {
    console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    console.log('User', user);
    const reservation = await Reservation.create({user: user._id, ...req.body});

    req.flash('success', 'Your reservation is successfully completed');
    res.redirect(`/reservations/${reservation.id}`);
  } catch (error) {
    req.flash('danger', `There was an error making your reservation: ${error}`);
    req.session.formData = req.body;
    res.redirect('/reservations/new');
  }
};

exports.edit = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: reservation.title,
      formData: reservation,
      restaurants : restaurants
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing your reservation: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let reservation = await Reservation.findById(req.body.id);
    if (!reservation) throw new Error('Your reservation could not be found');

    const attributes = {user: user._id, ...req.body};
    await Reservation.validate(attributes);
    await Reservation.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'Your reservation was updated successfully, Have a Happy Meal :)');
    res.redirect(`/reservations/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating your reservation: ${error}`);
    res.redirect(`/reservations/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Reservation.deleteOne({_id: req.body.id});
    req.flash('success', 'The reservation was deleted successfully');
    res.redirect(`/reservations`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this reservation: ${error}`);
    res.redirect(`/reservations`);
  }
};