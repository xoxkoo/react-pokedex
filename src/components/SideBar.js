/**
 *	https://www.codinglabweb.com/2022/08/create-sidebar-html-css-javascript.html
*/

import { Link } from 'react-router-dom';

export default function SideBar() {
	return <nav className='open'>
				<div className="sidebar">
					<div className="logo">
						<i className="bx bx-cricket-ball menu-icon"></i>
						<span className="logo-name">Pokédex</span>
					</div>

					<div className="sidebar-content">
						<ul className="lists">
							{/* <li className="list">
								<label>
									<input className="link" type='search' placeholder='Search for pokemon'></input>
								</label>
							</li> */}
							<li className="list">
								<Link to="/" className="nav-link">
									<i className="bx bx-home-alt icon"></i>
									<span className="link">Home</span>
								</Link>
							</li>
							<li className="list">
								<Link to="/about" className="nav-link">
									<i className="bx bx-laptop icon"></i>
									<span className="link">About</span>
								</Link>
							</li>

						</ul>
					</div>
				</div>
			</nav>
}