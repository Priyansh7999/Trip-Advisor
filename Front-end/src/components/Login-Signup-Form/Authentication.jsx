import React from 'react';
import { useForm } from 'react-hook-form';
import './form.css'; // Assuming the CSS is in App.css

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="chk" aria-hidden="true">Sign up</label>
        <input
          type="text"
          name="txt"
          placeholder="User name"
          {...register('txt', { required: 'User name is required' })}
        />
        {errors.txt && <span>{errors.txt.message}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          name="pswd"
          placeholder="Password"
          {...register('pswd', { required: 'Password is required' })}
        />
        {errors.pswd && <span>{errors.pswd.message}</span>}

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="chk" aria-hidden="true">Login</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          name="pswd"
          placeholder="Password"
          {...register('pswd', { required: 'Password is required' })}
        />
        {errors.pswd && <span>{errors.pswd.message}</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
const Authentication = () => {
  return (
    <div className='forms'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <SignUp />
        </div>
        <div className="login">
          <Login />
        </div>
      </div>
    </div>
   
  );
};
export default Authentication;