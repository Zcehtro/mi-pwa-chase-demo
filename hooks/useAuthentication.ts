import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout, enableWebAuthn, closeSession } from '../redux/slices/userSlice';

export default function useAuthentication() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const User = user.user;

  const Auth = (user: any) => {
    dispatch(authenticate(user));
    console.log('[DEBUG] [useAuthentication] Auth() Payload:', user);
  };

  const Logout = () => {
    dispatch(logout());
    console.log('[DEBUG] [useAuthentication] Logout()');
  };

  const EnableWebAuthn = () => {
    dispatch(enableWebAuthn());
    console.log('[DEBUG] [useAuthentication] enableWebAuthn()');
  };

  const CloseSession = () => {
    dispatch(closeSession());
    console.log('[DEBUG] [useAuthentication] closeSession()');
  };

  return { User, Auth, EnableWebAuthn, Logout, CloseSession };
}
