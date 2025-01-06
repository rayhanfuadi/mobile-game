import Leaderboard from "@/components/layouts/Leaderboars"
import store from "@/redux/store"
import { Provider } from "react-redux"

const Home = () => {
  return (
    <Provider store={store}>
      <div className="grid gap-[60px] container">
        <div className="min-h-screen">
          <Leaderboard />
        </div>
      </div>
    </Provider>
  )
}

export default Home