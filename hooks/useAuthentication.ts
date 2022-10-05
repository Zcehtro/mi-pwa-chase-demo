import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout, enableWebAuthn, closeSession } from '../redux/slices/userSlice';

export default function useAuthentication() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const User = user.user;

  const Auth = (user: any) => {
    dispatch(authenticate(user));
  };

  const Logout = () => {
    dispatch(logout());
  };

  const EnableWebAuthn = () => {
    dispatch(enableWebAuthn());
  };

  const CloseSession = () => {
    dispatch(closeSession());
  };

  return { User, Auth, EnableWebAuthn, Logout, CloseSession };
}
