import { removeCredentials } from '@/features/auth/authSlice';
import { useLazyLogoutQuery } from '@/services/auth';
import { useDispatch } from 'react-redux';

function useLogout() {
  const dispatch = useDispatch();
  const [triggerLogout] = useLazyLogoutQuery();
  const handleLogout = async () => {
    await triggerLogout();
    dispatch(removeCredentials());
  }

  return handleLogout;
}

export default useLogout