import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Upload from "../pages/Upload"
import Dashboard from "../pages/Dashboard"
import History from "../pages/History"
import NotFound from "../pages/NotFound"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="upload" element={<Upload />} />
        <Route path="dashboard/:fileId" element={<Dashboard />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRouter