/* eslint-disable no-unused-vars */
import axios from "axios";
import  { useRef, useState } from "react";
import { useToast } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/data";
export default function Signup() {
    const toast = useToast()
    const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
    const [strength, setStrength] = useState(0);
    const [checkPassword, setCheckPassword] = useState(0);
	const [loading, setLoading] = useState(false);
    const [showFormatTooltip, setShowFormatTooltip] = useState(false);

    const showTooltip = () => {
        setShowFormatTooltip(true);
      };
    
      const hideTooltip = () => {
        setShowFormatTooltip(false);
      };
    
    const checkStrength = (value) => {
        
        let passwordStrength = 0;
        if (value.length >= 8) passwordStrength++;
        if (value.match(/[A-Z]/)) passwordStrength++;
        if (value.match(/[0-9]/)) passwordStrength++;
        if (value.match(/[^A-Za-z0-9]/)) passwordStrength++;
        setStrength(passwordStrength);
      };

    const handlePassword = (e) => {
        if (e.target.value !== passwordRef.current.value) {
            setCheckPassword(1);
          } else {
            setCheckPassword(0);
          }
    }
    const handleSubmit = async (e) => {
        
        e.preventDefault();
		try {
            if (!emailRef.current.value && !passwordRef.current.value && !passwordConfirmRef.current.value)
            {
    
                throw new Error("Please fill all the fields");
            }
			if (passwordRef.current.value !== passwordConfirmRef.current.value)
            {
                throw new Error("Passwords do not match");
                
            }
			const res = await axios.post(
				API_URL+"api/user/signup",
				{
					email: emailRef.current.value,
					password: passwordRef.current.value,
				},
				{
					withCredentials: true,
				}
			);
			setLoading(false);
            toast({
                title: 'Success',
                description: "Success",
                status: 'success',
                duration: 6000,
                isClosable: true,
              })
			setTimeout(() => {
				navigate("/imgauth");
			}, 4000);
		} catch (err) {
			
            toast({
                title: 'Error Occurred',
                description: err.response ? err.response.data.msg : err.msg,
                status: 'error',
                duration: 6000,
                isClosable: true,
              })
			setLoading(false);
		}
	};
    return (
        <div className="flex justify-center item-center flex-1 h-screen">
            <div className="hidden flex-1 bg-blue-950 md:flex flex-col justify-center items-center">
                <img src="/signup.png" alt="" />
            </div>
            <div className=" flex flex-1 bg-center justify-center items-center">
                <form className="md:w-1/2 p-8 md:p-0 space-y-5 flex flex-col justify-center">
                    <h1 className="text-xl font-semibold">Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <div>
                        <label htmlFor="email" className="inline-block border-0 mb-2 ">
                            <p className="font-medium text-lg">Email</p>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            ref={emailRef}
                            name="email"
                            required
                            className="bg-inherit border-2 inline-block px-8 py-6 border-slate-300 focus:outline-none focus:border-b-4 focus:border-b-green-400 h-7   w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="psw" className="w-full inline-block mb-2">
                            <p className="font-medium text-lg">Password</p>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            ref={passwordRef}
                            name="psw"
                            required
                            onChange={(e) => checkStrength(e.target.value)}
                            className={`bg-inherit border-2 inline-block px-8 py-6 border-slate-300 focus:outline-none focus:border-b-4 h-7 w-full ${
                            strength === 0
                            ? "focus:border-b-red-400"
                            : strength === 4
                            ? "focus:border-b-green-400"
                            : "focus:border-b-yellow-400"
        }`}
        onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
                        />
                            {showFormatTooltip && (
                                <div className="absolute text-[15px]   text-gray-600 z-10 bg-white  border border-gray-300 rounded p-2 mt-1 w-[300px]">
            Password format: At least 8 characters, with upper and lower case letters, numbers, and special characters.
          </div>
        )}
                    </div>

                    <div>
                        <label htmlFor="psw-repeat" className="w-9/12 inline-block mb-2">
                            <p className="font-medium text-lg">Repeat Password</p>
                        </label>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            ref={passwordConfirmRef}
                            name="psw-repeat"
                            required
                            onChange={(e) => handlePassword(e)}
                            className={`bg-inherit border-2 inline-block px-8 py-6 border-slate-300 focus:outline-none focus:border-b-4 h-7   w-full
                            ${ checkPassword
                            ? "focus:border-b-red-400"
                            : "focus:border-b-green-400" }`}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="checkbox"
                            defaultChecked="checked"
                            name="remember"
                            className="inline-block"
                        />
                        <p>Remember me?</p>
                    </div>

                    {/* <p>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms &amp; Privacy
            </a>
            .
          </p> */}
                    <div className="clearfix">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white  mb-2 rounded w-full hover:bg-blue-700 opacity-90 cursor-pointer px-6 py-4"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p>
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-700 text-secondary font-medium text-lg">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            </div>
    
    );
}