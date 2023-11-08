import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function GoogleLogin({ buttonText }) {
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });


let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: 'https://shy-cloud-3319.fly.dev/api/v1/auth/google',  
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  
  

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

  
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button
      variant="outline-danger"
      className="login-google mt-2"
      onClick={() => loginWithGoogle()}
    >
      {buttonText}
    </Button>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default GoogleLogin;
