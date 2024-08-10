import "react-toastify/dist/ReactToastify.css";
import Inicio from "./componentes/Inicio";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import Navbar from "./componentes/Navbar";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./componentes/Dashboard";
import { Flip, ToastContainer } from "react-toastify";

function App() {

	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navbar />}>
							<Route path="/" element={<Inicio />} />
							<Route path="/Dashboard" element={<Dashboard />} />
							<Route path="/Registro" element={<Registro />} />
							<Route path="/Login" element={<Login />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>

			<ToastContainer
				position="bottom-right"
				autoClose={2500}
				hideProgressBar
				limit={5}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Flip}
			/>
      </>
	);
}

export default App;
