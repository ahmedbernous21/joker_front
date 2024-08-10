interface LoginInputProps {
  name: "email" | "password";
  dataToSubmit: { email: string; password: string };
  setDataToSubmit: (data: { email: string; password: string }) => void;
}

export default LoginInputProps;
