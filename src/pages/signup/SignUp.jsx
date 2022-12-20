import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/auth/authReducer";
import "./SignUp.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const checkPassword = watch("password");
  const dispatch = useDispatch();
  const { userLogIn } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogIn) {
      return navigate("/");
    }
  }, [userLogIn]);

  return (
    <Container  className="conatiner">
     
      <div className="signup-form w-2/4 p-5">
        <Form
          className="form-signup"
          onSubmit={handleSubmit((data) => {
            dispatch(signUp(data));
          })}
        >
          <div className="border-b w-full text-center pt-2 mx-24">
            <span className="text-3xl font-bold mb-3 signin">Join Fiverr</span>
          </div>
          <div className="w-full px-6 flex flex-wrap mt-4">
            <div className="w-full text-center mb-3">
              <span className="text-lg font-semibold">Continue with</span>
            </div>
            <div className="w-full flex justify-center border-b mx-32 pb-4">
              <span className="mr-3 cursor-pointer">
                <svg
                  className="w-[30px] h-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Ebene 1"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#1877f2"
                    d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                  />
                  <path
                    fill="#fff"
                    d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                  />
                </svg>
              </span>
              <span className="cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 18 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 7.84363V11.307H13.8438C13.6365 12.428 12.9994 13.373 12.0489 14.0064V16.2534H14.9562C16.6601 14.6951 17.641 12.4029 17.641 9.67839C17.641 9.04502 17.5854 8.43176 17.4792 7.84865H9V7.84363Z"
                    fill="#3E82F1"
                  ></path>
                  <path
                    d="M9.00001 14.861C6.65394 14.861 4.67192 13.2876 3.96406 11.1714H0.955627V13.4937C2.43709 16.4142 5.48091 18.4198 9.00001 18.4198C11.432 18.4198 13.4697 17.6206 14.9562 16.2533L12.0489 14.0064C11.245 14.5443 10.2135 14.861 9.00001 14.861Z"
                    fill="#32A753"
                  ></path>
                  <path
                    d="M3.96404 5.45605H0.955617C0.348876 6.66246 0 8.02972 0 9.47238C0 10.915 0.348876 12.2823 0.955617 13.4887L3.96404 11.1714C3.78202 10.6335 3.6809 10.0605 3.6809 9.47238C3.6809 8.88426 3.78202 8.31122 3.96404 7.77336V5.45605Z"
                    fill="#F9BB00"
                  ></path>
                  <path
                    d="M0.955627 5.45597L3.96406 7.77327C4.67192 5.65703 6.65394 4.08368 9.00001 4.08368C10.3197 4.08368 11.5079 4.53608 12.4382 5.42078L15.0219 2.85214C13.4646 1.40948 11.427 0.52478 9.00001 0.52478C5.48091 0.52478 2.43709 2.53043 0.955627 5.45597Z"
                    fill="#E74133"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full p-3">
            <div className="text-center text-lg font-semibold">
              <span>OR</span>
            </div>
            <span className="text-lg font-semibold">Name</span>
            <input
              className="w-full p-3 border border-indigo-600"
              type="text"
              placeholder="name"
              {...register("name", {
                required: "Looks like this name is incomplete.",
                minLength: {
                  value: 6,
                  message:
                    "Make sure it's at least 32 characters OR at least 6 characters.",
                },
                maxLength: {
                  value: 32,
                  message:
                    "Make sure it's at least 32 characters OR at least 6 characters.",
                },
                pattern: {
                  value:
                    /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                  message:
                    "Please only use alphabetical characters and spaces in name",
                },
              })}
            />
            <p className="text-red-600 error">{errors.name?.message}</p>
          </div>
          <div className="w-full p-3">
            <span className="text-lg font-semibold">Password</span>
            <input
              className="w-full p-3 border border-indigo-600"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Looks like this password is incomplete.",
                minLength: {
                  value: 5,
                  message:
                    "Make sure it's at least 12 characters OR at least 5 characters.",
                },
                maxLength: {
                  value: 12,
                  message:
                    "Make sure it's at least 12 characters OR at least 5 characters.",
                },
              })}
            />
            <p className="text-red-600 error">{errors.password?.message}</p>
          </div>
          <div className="w-full p-3">
            <span className="text-lg font-semibold">Repeat Password</span>
            <input
              className="w-full p-3 border border-indigo-600"
              type="password"
              name="password_repeat"
              placeholder="Repeat Password"
              {...register("password_repeat", {
                required: true,
                validate: (val) => {
                  if (checkPassword !== val) {
                    return "Your repeat password does not match";
                  }
                },
              })}
            />
            <p className="text-red-600 error">
              {errors.password_repeat?.message}
            </p>
          </div>
          <div className="w-full p-3">
            <span className="text-lg font-semibold">Email</span>
            <input
              className="w-full p-3 border border-indigo-600"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Looks like this email is incomplete.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email is invalid or already taken",
                },
              })}
            />
            <p className="text-red-600 error">{errors.email?.message}</p>
          </div>
          <div className="w-full p-3">
            <span className="text-lg font-semibold">Phone Number</span>
            <input
              className="w-full p-3 border border-indigo-600"
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Looks like this phone number is incomplete.",
                minLength: {
                  value: 10,
                  message:
                    "Make sure it's at least 11 numbers OR at least 10 numbers.",
                },
                maxLength: {
                  value: 11,
                  message:
                    "Make sure it's at least 11 numbers OR at least 10 numbers.",
                },
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: "Please input numeric characters only.",
                },
              })}
            />
            <p className="text-red-600 error">{errors.phone?.message}</p>
          </div>
          <div className="w-full p-3">
            <button className="btn-signup w-full h-[40px]" type="submit">
              <span className="text-white text-xl font-semibold">Continue</span>
            </button>
          </div>
          <div className="text-center flex flex-wrap mb-2">
            <div className="w-full">
              <span className="text-black-500">
                Already a member?
                <Link
                  to="/signin"
                  className="cursor-pointer underline text-green-600 ml-2"
                >
                  Sign In
                </Link>
              </span>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 70%;
  height: 100%;
  background-color: white;
  border-radius: 18px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  .error {
    &:empty {
      display: none;
    }
  }
 
  
`;
