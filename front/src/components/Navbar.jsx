import React, { useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

import { navMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = () => {
  const dispatch = useDispatch();
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuth, setIsAuth] = useState(false); // userInfo가 없는 상태 초기화

  const handleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential); // jwtDecode (credential을 사용하기 위함)
    dispatch(login({ authData: decoded, token: response.credential }));
    setIsAuth(true);
  };

  useEffect(() => {
    if (window.google) {
      // 구글 ID가 가져올때
      window.google.accounts.id.initialize({
        // 구글 값 초기화
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID, // env.local CLIENT ID 참조
        callback: handleLoginSuccess,
      });
    }
  }, [googleClientId]);
  const handleLogin = () => {
    window.google.accounts.id.prompt(); // 로그인 팝업 띄우기
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false);
    console.log('logout');
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
      <div className="login-wrapper flex items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/" className="font-customFontEn">
            GUSWLDA
          </Link>
        </h2>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              menu.idx === idx ? 'bg-gray-950 border border-gray-700' : ''
            } rounded-sm mb-1`}
          >
            <Link to={menu.to} className="flex gap-x-4 items-center py-2 px-10">
              {menu.icon} {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      {isAuth ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className="">
          <button
            onClick={handleLogin}
            className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5" />
            Login With Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
