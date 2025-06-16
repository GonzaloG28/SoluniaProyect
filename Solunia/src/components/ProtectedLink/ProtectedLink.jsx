import { useContext, useState, cloneElement } from "react";
import { AuthContext } from "../../authContext";
import AuthModal from "../AuthModal/AuthModal";

const ProtectedLink = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = (e, originalOnClick) => {
    if (!token) {
      e.preventDefault();
      e.stopPropagation();
      setShowAuthModal(true);
    } else if (originalOnClick) {
      originalOnClick(e);
    }
  };

  // Si el hijo es un React element, clonamos e inyectamos lógica
  if (children.type) {
    const isDisabled = !token && (children.type === "button" || children.props?.onClick);

    return (
      <>
        {cloneElement(children, {
          onClick: (e) => handleClick(e, children.props.onClick),
          ...(isDisabled ? { disabled: true, style: { opacity: 0.5, cursor: "not-allowed" } } : {}),
        })}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  // Si no es un React element (por ejemplo texto plano), simplemente lo envuelve
  return (
    <>
      <div
        onClick={(e) => {
          if (!token) {
            e.preventDefault();
            setShowAuthModal(true);
          }
        }}
      >
        {children}
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default ProtectedLink;