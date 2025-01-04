import Leaderboard from "@/components/layouts/Leaderboars"
import Navbar from "@/components/layouts/Navbar"
import { store } from "@/redux/store"
import { Provider } from "react-redux"

const Home = () => {
  return (
    <Provider store={store}>
      <div className="grid gap-[60px] container">
        <Navbar />
        <Leaderboard />
      </div>
    </Provider>
  )
}

export default Home