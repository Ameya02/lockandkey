import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RGB = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [colors, setColors] = useState({
    red: 0,
    blue: 0,
    green: 0,
  });
  const [pattern, setPattern] = useState("");

  const handlePattern = async (e) => {
    e.preventDefault();
    let value = e.target.value;

    if (colors[value] <= 1) {
      setColors({
        ...colors,
        [value]: colors[value] + 1,
      });

      setPattern(pattern + value);
      toast({
        title: "Clicked",
        status: "info",
        duration: 2000,
      });
    } else {
      toast({
        title: "Warning",
        description: "You can only click twice!",
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!pattern) {
        toast({
          title: "Error Occurred",
          description: "Enter a pattern",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return ;
      }
      setLoading(true);
      const res = await axios.post(
        "https://lockandkey.onrender.com/api/user/colorauth",
        {
          color_secret: pattern,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: "Success",
        description: "Success",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      toast({
        title: "Error Occurred",
        description: err.response ? err.response.data.msg : err.msg,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <div className="bg-blue-50 h-screen">
      <div className=" bg-blue-50 flex justify-center items-center h-5/6">
        <div className=" bg-white p-8 rounded-lg shadow-xl h-96 w-96 ">
          <h2 className="flex justify-center items-center p-1 text-xl font-semibold">
            Sign Up
          </h2>
          <h3 className="flex justify-center items-center p-3 font-normal">
            Enter your pattern !
          </h3>
          <div className="flex justify-center p-6 space-x-4 ">
            <button
              className="w-12 h-12 bg-red-500 p-10 rounded-lg shadow-lg"
              value="red"
              onClick={handlePattern}
            ></button>
            <button
              className="w-12 h-12 bg-green-500 p-10 rounded-lg shadow-lg"
              value="green"
              onClick={handlePattern}
            ></button>
            <button
              className="w-12 h-12 bg-blue-500 p-10 rounded-lg shadow-lg"
              value="blue"
              onClick={handlePattern}
            ></button>
          </div>
          <div className="flex justify-center">
            <p className="text-red-600 ">Two clicks only!</p>
          </div>
          <div className="flex justify-center items-center p-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white  mb-2 rounded w-full hover:bg-blue-700 opacity-90 cursor-pointer px-6 py-4"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RGB;
