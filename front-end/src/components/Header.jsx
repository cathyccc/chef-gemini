import chefClaudeLogo from "../assets/chef-claude-icon.svg";

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <img className="nav-logo-icon" src={chefClaudeLogo} alt="chef-claude-logo"/>
        <span className="nav-logo-text">Chef Gemini</span>
      </nav>
    </header>
  )
};