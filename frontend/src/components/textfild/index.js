import React from "react";
import svgIcon from "../../../assets/Symbol/svgIcon";
import PropTypes from "prop-types";
import error from "../../asset/";
const LoginForm = ({
  onSubmitHandler,
  register,
  handleSubmit,
  errors,
  loading,
  errorMsg,
}) => {
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-[28px]">
        <label
          htmlFor="username"
          className={
            !errorMsg
              ? "block text-sm font-normal font-Aktiv text-gray-700 mb-[10px]"
              : "text-darkred text-sm font-normal font-Aktiv"
          }
        >
          Email
        </label>
        <input
          {...register("username")}
          required
          type="text"
          name="username"
          placeholder="Eg., john@aecom.com"
          className={
            errorMsg
              ? "mt-1 border-darkred border-2 block w-full focus:outline-none font-Aktiv  bg-grey shadow-sm sm:text-sm border-red-300 py-[12px] px-[10px] rounded-md"
              : "mt-1 block w-full focus:outline-none font-Aktiv  bg-grey shadow-sm sm:text-sm border-gray-300 py-[12px] px-[10px] rounded-md"
          }
        />
        <p className="text-red text-xs mt-1">{errors.username?.message}</p>
      </div>
      <div className="mb-[28px]">
        <label
          htmlFor="userpassword"
          className={
            errorMsg
              ? "text-darkred text-sm font-normal font-Aktiv"
              : "block text-sm font-normal font-Aktiv  text-gray-700 mb-[10px]"
          }
        >
          Password
        </label>
        <input
          {...register("userpassword")}
          required
          type="password"
          name="userpassword"
          placeholder="********"
          className={
            errorMsg
              ? "mt-1 border-darkred border-2 block w-full focus:outline-none font-Aktiv  bg-grey shadow-sm sm:text-sm border-red-300 py-[12px] px-[10px] rounded-md"
              : "mt-1  block w-full focus:outline-none bg-grey shadow-sm sm:text-sm border-gray-300 py-[12px] px-[10px] rounded-md"
          }
        />
        <p className="text-red text-xs mt-1">{errors.userpassword?.message}</p>
      </div>
      <div
        htmlFor="username"
        className={
          !errorMsg
            ? "opacity-0"
            : "text-darkred font-medium text-sm font-Aktiv flex items-center bg-lightred py-[10px] pl-[14px] rounded mb-5"
        }
      >
        <img src={error} alt="error" className="mr-3" />
        <p>Invalid credentials</p>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            className=" focus:outline-lightgreen focus:ring-lightgreen focus:bg-white focus:border-lightgreen h-4 w-4  border-gray-300 rounded accent-lightgreen"
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="comments"
            className="font-normal text-black text-sm font-Aktiv"
          >
            Remember me
          </label>
        </div>
      </div>
      <div className="px-4 mt-[30px]  text-center sm:px-6">
        <button
          type="submit"
          className={
            !errorMsg
              ? "flex items-center w-[100%] justify-center py-2 px-4 border border-transparent shadow-sm text-[17px] uppercase font-Aktiv rounded-md font-bold text-white bg-lightgreen hover:bg-lightgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightgreen"
              : "flex items-center w-[100%] justify-center py-2 px-4 border shadow-sm text-[17px] uppercase font-Aktiv rounded-md font-bold text-white bg-lightgreen1  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightgreen"
          }
        >
          {loading ? (
            <svg
              className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <>
              <span className="capitalize">Login</span>
              <img
                className="ml-1"
                src={svgIcon.leftarrow.default}
                alt="info"
              />
            </>
          )}
        </button>
      </div>
      <div className="mt-[30px] text-center">
        <p className="text-gray-500 font-Aktiv Grotesk Corp text-sm font-normal">
          Trouble signing in?{" "}
          <span className="text-lightgreen">Click here</span> and try self help
          before reaching out to help desk
        </p>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmitHandler: PropTypes.func,
  register: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  errorMsg: PropTypes.bool,
};

export default LoginForm;
