import "styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "common/context";
import { 
	VideoListingPage,
	LoginPage,
	SignUpPage,
	NotFound404Page,
	LikedVideosPage,
	WatchHistoryPage,
	WatchLaterPage
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
						<Route path="/liked" element={<Navigate to="/login" />} />
						<Route path="/history" element={<Navigate to="/login" />} />
						<Route path="/watchlater" element={<Navigate to="/login" />} />
					</> :
					<>
						<Route path="/login" element={<Navigate to="/" />} />
						<Route path="/signup" element={<Navigate to="/" />} />
						<Route path="/liked" element={<LikedVideosPage />} />
						<Route path="/history" element={<WatchHistoryPage />} />
						<Route path="/watchlater" element={<WatchLaterPage />} />
					</>
				}
				<Route path="*" element={<NotFound404Page />} />
			</Routes>
		</div>
	);
}

export default App;
