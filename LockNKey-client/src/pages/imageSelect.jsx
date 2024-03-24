import React, { useState } from 'react'
import Img1 from "../assets/img1.jpg";
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img3.jpg";
import Img4 from "../assets/img4.jpg";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ImageSelect = () => {
    const toast = useToast();
    const [pictureGrid, setPictureGrid] = useState({});
    const [picturePattern, setPicturePattern] = useState("");
    const [imageSelect, setImageSelect] = useState("")
    const navigate = useNavigate();
    const handleImageSelection = (e) => {

        const value = e.target.value;
        setImageSelect(value);


    }
    const handlePattern = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (pictureGrid[value]){
        if (pictureGrid[value] <= 2) {
          setPictureGrid({
            ...pictureGrid,
            [value]: pictureGrid[value] + 1,
          });
          
          setPicturePattern(picturePattern + value);
          toast({
            title: "Clicked",
            status: "info",
            duration: 2000,
          });
        } else {
          console.log(pictureGrid)
          toast({
            title: "Warning",
            description: "You can only click twice!",
            status: "warning",
            duration: 6000,
            isClosable: true,
          });
        }
    }else{
        setPictureGrid({
            ...pictureGrid,
            [value]: 1,
          });
          
          setPicturePattern(picturePattern + value);
          toast({
            title: "Clicked",
            status: "info",
            duration: 2000,
          });
    }
      };
    
      const [loading, setLoading] = useState(false);
      const handleSubmit = async (e) => {
        console.log(picturePattern,imageSelect)
        e.preventDefault();
        try {
          if (!picturePattern) {
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
            "api/user/imgauth",
            {
              img_secret: picturePattern,
              img_url: imageSelect,
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
            navigate("/colorauth");
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
    <div className='bg-lavender h-screen flex items-center justify-center'>
{!imageSelect ? ( 
            <div className='bg-blue-50 p-8 rounded-lg shadow-lg'>
               
                <h2 className='flex justify-center items-center p-1 text-xl font-semibold'>Image Selection</h2>
                <h3 className='flex justify-center items-center p-3 font-normal'>Select the right image for authentication!</h3>

                <div className='mt-[30px] h-96 border-solid border relative flex justify-center'>
                    <div className="grid grid-cols-2 gap-5  absolute z-10 ">
                    <div className="flex justify-center items-center relative" >
                    <img src={Img1} className='z-0 absolute object-contain bg-center' />
                    <button onClick={handleImageSelection} value={Img1} className="hover:border-blue-600 w-60 h-44   overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
             <div className="flex justify-center items-center relative" >
                    <img src={Img2} className='z-0 absolute object-contain bg-center' />
                    <button onClick={handleImageSelection} value={Img2} className="hover:border-blue-600 w-60 h-44 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
               <div  className="flex justify-center items-center relative" >
                    <img src={Img3} className='z-0 absolute object-contain bg-center' />
                    <button onClick={handleImageSelection} value={Img3} className="hover:border-blue-600 w-60 h-44 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
               <div  className="flex justify-center items-center relative" >
                    <img src={Img4} className='z-0 absolute object-contain bg-center' />
                    <button onClick={handleImageSelection} value={Img4} className="hover:border-blue-600 w-60 h-44 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                
                    </div>

                    </div>
        </div>
):(
    <div className='bg-blue-50 p-8 rounded-lg shadow-lg'>

                <input type="text" id="picture_password" name="picture_password" className="pic_text"></input>
                <h2 className='flex justify-center items-center p-1 text-xl font-semibold'>Verification</h2>
                <h3 className='flex justify-center items-center p-3 font-normal'>Click on the correct points to verify yourself successfully!</h3>

                <div className='mt-[30px] h-96 border-solid border relative flex justify-center overflow-hidden'>
                    <div className="grid grid-cols-6  absolute z-10 ">
                    <div key={1} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={1} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={2} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={2} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={3} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={3} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={4} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={4} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={5} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={5} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={6} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={6} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={7} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={7} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={8} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={8} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={9} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={9} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={10} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={10} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={11} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={11} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={12} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={12} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={13} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={13} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={14} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={14} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={15} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={15} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={16} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={16} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={17} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={13} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={18} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={14} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={19} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={15} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={20} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={16} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={21} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={13} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={22}  className="flex justify-center items-center">
                    <button onClick={handlePattern} value={14} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                <div key={23} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={15} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>  
                <div key={24}  className="flex justify-center items-center">
                    <button onClick={handlePattern} value={16} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border-4 z-10"></button>
                </div>
                
                    </div>

                    <img
                        id="imagePreview"
                        src={imageSelect}
                        className='object-contain absolute bg-center overflow-hidden'
                    />
                </div>

                <div className='flex justify-center items-center p-2'>
                    <button
                    onClick={handleSubmit}
                        className="bg-blue-600 text-white mb-2 rounded w-full hover:bg-blue-700 opacity-90 cursor-pointer px-6 py-4"
                    >
                        Verify
                    </button>
                </div>
            </div>
)}
        </div>
  )
}

export default ImageSelect