import '../css/side-navigation.scss'
import { Outlet } from "react-router-dom"
import SideBar from '../components/SideBar';

export default function Root() {
  return (
    <>
	 <main>

		<SideBar></SideBar>
		<section>
			<Outlet />
		</section>
	 </main>


    </>
  );
}