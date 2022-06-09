import "styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { 
	VideoListingPage
} from "pages";
import { MockAPI } from "components";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<VideoListingPage />} />
			</Routes>
		</div>
	);
}

export default App;
