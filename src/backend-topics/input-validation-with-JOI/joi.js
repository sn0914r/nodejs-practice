/* =============================================================================================================================
JOI
npm i joi

1. Joi is a validation library for JavaScript.
============================================================================================================================= */
const Joi = require("joi");

const schemaObject = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.ref("password"),
  details: {
    stateCode: Joi.string().max(2),
    pincode: Joi.number(),
  },
  DOB: Joi.date().greater(new Date("2000-01-01")),
}).options({
  abortEarly: false,
  // when true, stops validation on the first error, otherwise returns all the errors found.
});

function validate(data) {
  const { error, value } = schemaObject.validate(data);

  if (error) {
    console.log(error.details.map((err) => err.message));
  } else {
    console.log(value);
  }
}



let data1 = {
  name: "tiGor",
  email: "tiGor12",
  password: "tiGor123",
  confirmPassword: "bhAAi123",
  details: {
    stateCode: "AA",
    pincode: 517325,
  },
  DOB: "2003-09-14",
};

validate(data1);

/* OUTPUT
[
  '"email" must be a valid email',
  '"confirmPassword" must be [ref:password]'
]
 */



let data2 = {
  name: "",
  email: "reddysivananda83@gmail.com",
  password: "sivananda123",
  confirmPassword: "sivananda123",
  details: {
    stateCode: "AP",
    pincode: 517325,
  },
  DOB: "2003-09-14",
};

validate(data2);

/* OUTPUT
[ '"name" is not allowed to be empty' ]
 */



let data3 = {
  name: "sivananda reddy",
  email: "reddysivananda83@gmail.com",
  password: "sivananda123",
  confirmPassword: "sivananda123",
  details: {
    stateCode: "AP",
    pincode: 517325,
  },
  DOB: "2003-09-14",
};

validate(data3);

/* OUTPUT
{
    name: "sivananda reddy",
    email: "reddysivananda83@gmail.com",
    password: "sivananda123",
    confirmPassword: "sivananda123",
    details: {
        stateCode: "AP",
        pincode: 517325,
    },
    DOB: "2003-09-14",
}
 */
