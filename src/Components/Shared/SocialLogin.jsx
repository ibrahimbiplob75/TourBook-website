
import { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthProvider } from "../../ContextProvider/ContextProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AxiosPublic from "../../AxiosPublic/AxiosPublic";


const SocialLogin = () => {
  const { GmailLogin } = useContext(AuthProvider);
  const navigate = useNavigate();
  const publicAxios=AxiosPublic();
  const handleGoogleSignIn=()=>{
      GmailLogin()
      .then((result)=>{
        const Loggeduser=result.user;
        const userInfo = {
          name: Loggeduser.displayName,
          email: Loggeduser.email,
          photo: Loggeduser.photoURL,
        };
        publicAxios.post("/users", userInfo)
        .then((res) => {
          console.log("Post api",res.data)
        if (res.data.insertedId || res.data.insertedId==null) {
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Google LoggedIn successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      })
      })
  }

  return (
    <div>
      <h2>Or sign in with</h2>
      <div className="divider"></div>
      <div className="flex flex-col-3">
        <div className="w-full text-center my-2">
          <button
           onClick={handleGoogleSignIn}
            className="btn btn-circle btn-outline"
          >
            <FaGoogle></FaGoogle>
          </button>
        </div>
        <div className="w-full text-center my-2">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-circle btn-outline"
          >
            <FaFacebook></FaFacebook>
          </button>
        </div>
        <div className="w-full text-center my-2">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-circle btn-outline"
          >
            <FaGithub></FaGithub>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
