import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateProfile } from '../../services/userSlice';

export const Profile: FC = () => {
  const storeUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const user = {
    name: storeUser?.name ?? '',
    email: storeUser?.email ?? ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    if (storeUser) {
      setFormValue((prevState) => ({
        ...prevState,
        name: storeUser.name,
        email: storeUser.email
      }));
    }
  }, [storeUser]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateProfile(formValue));
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
