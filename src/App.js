import "styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "common/context";
import { 
	VideoListingPage,
	LoginPage,
	SignUpPage
} from "pages";
import { MockAPI } from "components";

function App() {
	const { isUserAuthenticated } = useAuth();

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<VideoListingPage />} />
				<Route path="/mock" element={<MockAPI />} />

				{ !isUserAuthenticated ? 
					<>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignUpPage />} />
					</> :
					<>
						<Route path="/login" element={<Navigate to="/" />} />
						<Route path="/signup" element={<Navigate to="/" />} />
					</>
				}
			</Routes>
		</div>
	);
}

export default App;
