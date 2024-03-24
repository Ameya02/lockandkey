import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
	const [user, setUser] = useState({});
	
	useEffect(()=> {
		const u = JSON.parse(localStorage.getItem('user'))|| null;
		if(!u){
			navigate("/signup")
		}
		else{
			setUser(u)
		}
	},[])
	
	
	const logout = () => {
		localStorage.clear()
		navigate("/signup")
	}
    return (
        <div className="bg-lavender h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold text-blue-900 mb-4 text-center">Logged in Successfully !</h2>
                <p className="text-gray-600 text-center">Welcome, {user.email}</p>
            </div>
        </div>
    );
};

export default Dashboard;
