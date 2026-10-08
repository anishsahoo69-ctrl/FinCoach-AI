import "./Logo.css";

const Logo = ({
  showTagline = false,
  size = "medium",
  onClick,
}) => {
  return (
    <div
      className={`fincoach-logo fincoach-logo-${size}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <img
        src="/images/fincoach-logo.png"
        alt="FinCoach AI"
        className="fincoach-logo-image"
      />

      {showTagline && (
        <p className="fincoach-logo-tagline">
          Smarter Money. Brighter Future.
        </p>
      )}
    </div>
  );
};

export default Logo;