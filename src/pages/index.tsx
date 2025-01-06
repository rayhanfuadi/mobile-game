import Leaderboard from "@/components/layouts/Leaderboars"
import store from "@/redux/store"
import { Provider } from "react-redux"

const Home = () => {
  return (
    <Provider store={store}>
      <div className="grid gap-[60px] container">
        <Leaderboard />
      </div>
    </Provider>
  )
}

export default Home