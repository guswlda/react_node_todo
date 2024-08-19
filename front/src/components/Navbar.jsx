import React, { useCallback, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';
// JWT: JSON WEB TOKEN을 DECODE하기 위해 사용

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

// data.js 값 불러옴 (Label, to, icon, idx 등 )
import { navMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

// redux (stored 가져옴)
// 구글 로그인 ID 값 (env 참고)
const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuth, setIsAuth] = useState(false); // userInfo가 없는 상태 초기화

  // 로그인 성공될 때 가져오는 값 => useCallback redux 계속 갱신되므로 사용함
  // jwtDecode (jwt : credential을 사용하기 위함)
  // dispatch 로그인
  // 갱신 후 setIsAuth(false)=> 로그인으로 변경됨
  const handleLoginSuccess = useCallback(
    (response) => {
      const decoded = jwtDecode(response.credential);
      dispatch(login({ authData: decoded }));
      setIsAuth(true);
    },
    [dispatch]
  );

  // 로그인 후 새로고침 시 로그아웃 되는 현상
  // dispatch가 실행될 시 useEffect 실행
  // JSON.parse : JSON => 객체로 변경 (JSON.stringify : 객체 => JSON)
  // localStorage storedData && storedToken (둘 다 있다면), dispatch => 로그인으로 인식
  // dispatch할 시 storedData, storedToken을 localStorage에 넣어줌 (useEffect 값을 다시 넣어줌)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuth(true);
    }
  }, [dispatch]);

  // 구글 ID가 가져올때 구글 값 초기화
  // env.local CLIENT ID 참조
  // callback (로그인 시 사용하는 함수 이해할 필요 X)
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleLoginSuccess,
      });
    }
  }, [googleClientId, handleLoginSuccess]);

  // 로그인 팝업 띄우기
  const handleLogin = () => {
    window.google.accounts.id.prompt();
  };

  // 로그아웃 될 때
  // 기본 logout 상태 : false (on: true, off: false)
  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false);
    console.log('logout');
  };

  // 로그인과 로그아웃 버튼 설정
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
              menu.idx === menuIdx ? 'bg-gray-950 ' : ''
            } rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300`}
          >
            <Link to={menu.to} className="flex gap-x-4 items-center py-2 px-10">
              {menu.icon} {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      {isAuth ? (
        <div className="w-4/5">
          <button
            onClick={handleLogout}
            className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="text-md">{name}님 Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-4/5">
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
