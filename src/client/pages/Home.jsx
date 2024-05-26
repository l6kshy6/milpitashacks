import img from "../assets/food-drive.jpg"
import { Link } from "react-router-dom";
import {addDoc,collection} from "firebase/firestore";
import { db } from "../firebase";

const testSend = () => {
    const newDoc = addDoc(collection(db, "drives"), {
      name: "walt's blue sky adventure",
      start: "12-12-2026",
      end: "12-25-2026",
      goals: {
        money: 200000,
        foods: 100
      },
      dropOffLocation: "408 negra arroyo lane alberquerque new mexico",
      desc: "help walt make more epic crystal",
      creatorID: 30430850125809134850139,
      progressfunds: {
        money: 0,
        foods: 1
      }
    })
      .then(res => console.log(res));
  }
const Home = ({ user }) => {
  return (
    <div className="flex p-10">
      <div className="flex flex-col w-full p-10 gap-10 items-center justify-center">
        <div className="text-4xl">Drive a difference in your community.</div>
        <Link to={user ? "/create" : "/signup"} className="bg-black text-white p-4 rounded-3xl w-1/2 hover:bg-red-500 hover:text-black transition-all text-center">Start a drive</Link>
        <Link to="/drives" className="text-xs text-blue-600 hover:underline">or check out other drives in your area</Link>
      </div>
      <div className="w-full">
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default Home;