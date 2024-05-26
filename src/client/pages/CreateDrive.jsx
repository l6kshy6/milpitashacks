import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import Autocomplete from "react-google-autocomplete";

const CreateDrive = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
    if (user != "poopy") {
      // const uid = user.uid;
      console.log(user);
    } else {
      navigate("/login");
    }
  }, [])
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [goals, setGoals] = useState([{ resource: "", amount: "" }])
  const [address, setAddress] = useState({ address: "", lat: "", lng: "" })
  const [desc, setDesc] = useState("")
  const [name, setName] = useState("")

  const addHandler = (e) => {
    e.preventDefault();
    if (!start || !goals || !address || !desc || !name) return;
    const newDoc = addDoc(collection(db, "drives"), {
      name: name,
      start: start,
      end: end,
      goals: goals,
      desc: desc,
      creatorID: user.uid,
      location: address,
      participants: 0
    })
      .then(res => console.log(res));
  }

  const onAddGoalHandler = (e) => {
    e.preventDefault()
    setGoals(goals => [...goals, { resource: "", amount: "", raised: 0 }])
  }

  const onRemoveGoalHandler = () => {
    setGoals(goals => goals.slice(0, -1))
  }

  const placeHandler = place => {
    console.log(place.formatted_address);
    console.log(place.geometry.location.lat());
    setAddress({
      address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    });
    console.log(address);
  }

  const onResourceChange = (e) => {
    console.log(e.target.id)
    setGoals(goals => goals.map((goal, i) => i == e.target.id ? { ...goal, resource: e.target.value } : goal))
  }

  const onAmountChange = (e) => {
    console.log(e.target.id)
    setGoals(goals => goals.map((goal, i) => i == e.target.id ? { ...goal, amount: e.target.value } : goal))
  }

  return (
    <div className="w-full h-full flex justify-center p-10">
      <form onSubmit={addHandler} className="w-2/3 h-max border border-black p-10 rounded-2xl flex flex-col items-center gap-5">
        {/* <div className="text-2xl">Add a drive</div> */}
        <input className="text-2xl w-full text-center" onChange={e => setName(e.target.value)} placeholder="Drive Name" />
        <div className="flex justify-between w-full">
          <div>Start</div><input type="date" onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="flex justify-between w-full">
          <span>End</span><input type="date" onChange={(e) => setEnd(e.target.value)} />
        </div>
        <textarea className="border w-full rounded-2xl p-3" onChange={e => setDesc(e.target.value)} placeholder="desc" />
        <div>Goals</div>
        {goals.map((goal, i) => <div key={i} className="flex gap-5 w-full">
          <input id={i} onChange={onResourceChange} className="border w-full rounded-2xl p-3" placeholder="resource" />
          <input id={i} onChange={onAmountChange} className="border w-full rounded-2xl p-3" placeholder="amount" />
        </div>)}
        <div className="flex w-full gap-5">
          <button className="border border-black rounded-2xl w-full p-3 hover:bg-black hover:text-white transition-all" onClick={onAddGoalHandler}>add goal</button>
          <button className={`border border-black rounded-2xl w-full p-3 ${goals.length == 1 ? "text-gray-500 border-gray-500" : "hover:bg-red-500 hover:text-white transition-all"}`} onClick={onRemoveGoalHandler} disabled={goals.length == 1}>remove</button>
        </div>
        <Autocomplete className="border w-full rounded-2xl p-3" apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onPlaceSelected={(place) => placeHandler(place)} options={{ types: ["address"] }} />
        <button className="bg-black rounded-2xl text-white w-full p-3 hover:bg-red-500 hover:text-black transition-all">Submit</button>
      </form>
    </div>
  );
}

export default CreateDrive