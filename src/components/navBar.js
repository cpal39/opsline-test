import logo from '../opsline_logo_full_color.png';
export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <a className="navbar-brand" href="/">
                <img src={logo} className="logo" width="150" height="30" alt="logo" />
            </a>
        </nav>
    );
}