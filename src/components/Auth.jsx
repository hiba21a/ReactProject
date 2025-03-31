import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="register-container flex items-center justify-center min-h-screen bg-blue-500">
            <Outlet/>
    </div>
  );
};

export default Auth;