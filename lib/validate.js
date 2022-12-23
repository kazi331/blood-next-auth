export default function signup_validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  // formik validation for email :  (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.blood) {
    errors.blood = 'Blood group is required'
  }

  return errors;
}


export function signin_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  };

  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors;
}