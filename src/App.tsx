import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import AlbumInfoPage from "./pages/AlbumInfoPage/AlbumInfoPage";
import AlbumListPage from "./pages/AlbumListPage/AlbumListPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import PhotoInfoPage from "./pages/PhotoInfoPage/PhotoInfoPage";
import PostInfoPage from "./pages/PostInfoPage/PostInfoPage";
import PostListPage from "./pages/PostListPage/PostListPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import UserListPage from "./pages/UserListPage/UserListPage";

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="albums" element={<AlbumListPage/>}/>
          <Route path="albums/:id" element={<AlbumInfoPage/>}/>
          <Route path="photo/:id" element={<PhotoInfoPage/>}/>
          <Route path="posts" element={<PostListPage/>}/>
          <Route path="posts/:id" element={<PostInfoPage/>}/>
          <Route path="users" element={<UserListPage/>}/>
          <Route path="users/:id" element={<UserInfoPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;
