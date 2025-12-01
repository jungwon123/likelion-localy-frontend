import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalStyle } from "@/styles/global-style";
import GlobalLayout from "@/shared/components/global-layout";
import HomePage from "@/pages/Home";
import ChatPage from "@/pages/Chat";
import LocalPage from "@/pages/Local";
import BookmarkPage from "@/pages/Bookmark";
import FeedbackPage from "@/pages/Feedback";
import MypagePage from "@/pages/Mypage";
import MissionPage from "@/pages/Mission";
import LocalDetailPage from "@/pages/LocalDetail";
import ChallengePage from "@/pages/Challenge";
import SpendPointsPage from "@/pages/SpendPoints";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/local" element={<LocalPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/mypage" element={<MypagePage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/local-detail/:id" element={<LocalDetailPage />} />
            <Route path="/challenge/:id" element={<ChallengePage />} />
            <Route path="/spend-points" element={<SpendPointsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
