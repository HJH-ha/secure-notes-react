import React from "react";
import { Navigate } from "react-router-dom";
import { useMyContext } from "../store/ContextApi";

// props로 관리자 페이지(adminPage)
const ProtectedRoute = ({ children, adminPage }) => {
  // useMyContext()를 사용하여 토큰과 어드민상태 확인(true, false) 가져옴
  const { token, isAdmin } = useMyContext();

  // 토큰이 없으면 로그인 페이지로(인증안된 유저)
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 토큰이 있고 관리자페이지 이면서 관리자가 아니면 /access-denied(접속거부페이지)로 보냄
  // 인증된 유저지만 관리자 권한이 없이 관리자 페이지 요청시
  if (token && adminPage && !isAdmin) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
