import { useContext, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";

const ProtectedLink = ({ children }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e, originalOnClick) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    } else if (originalOnClick) {
      originalOnClick(e);
    }
  };

  if (children.type) {
    return cloneElement(children, {
      onClick: (e) => handleClick(e, children.props.onClick),
    });
  }

  return <div onClick={handleClick}>{children}</div>;
};

export default ProtectedLink;