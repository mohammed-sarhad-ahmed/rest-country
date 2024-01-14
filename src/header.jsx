export default function Header({ children, mode }) {
  return (
    <header
      className={`header ${mode === "dark" ? "dark-mode-el-bg" : "white-bg"} `}
    >
      <Logo />
      {children}
    </header>
  );
}

function Logo() {
  return <p className="logo">Where In The World 🤔</p>;
}
