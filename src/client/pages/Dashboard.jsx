import { db } from "../firebase";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Dashboard = ({ user }) => {
  const [drives, setDrives] = useState([]);
  const total = drives.length > 0 ? drives.reduce((res, drive) => res + drive.goals.find(goal => goal.resource == "money").amount) : 0;
  useEffect(() => {
    const q = query(collection(db, "drives"), where("creatorID", "!=", "[]"));
    onSnapshot(q, (docs) => {
      const tempDrives = [];
      docs.forEach(doc => {
        tempDrives.push({ ...doc.data(), id: doc.id });
      });
      setDrives(tempDrives)
      console.log(tempDrives)
      // console.log(docs)
      // setSnapshot(docs);
      // // console.log(docs.data());
    });
  }, [])

  return (
    <div className="p-10 flex flex-col gap-5">
      <div className="text-lg">Welcome, First Name</div>
      <div className="text-2xl">Analytics</div>
      <div className="flex justify-between">
        <div>Total money raised</div>
        <div>${total}</div>
      </div>
      <div className="flex justify-between">
        <div>Total number of participants</div>
        <div>${total}</div>
      </div>
      <div className="text-2xl">My Resource Drives</div>
      {drives.map(drive => <div className="border p-5 rounded-2xl flex flex-col gap-2" key={drive.id}>
        <div className="overflow-hidden truncate text-sm font-bold">{drive.name}</div>
        <div className="italic text-xs text-gray-500">{drive.location.address}</div>
        {drive.goals.map((goal, i) => <div className="text-xs flex items-center justify-between" key={i}>
          <div className="">{goal.resource}</div>
          <div className="font-bold">0 of {goal.amount} raised</div>
        </div>)}
      </div>)}
      <Link to={user ? "/create" : "/signup"} className="bg-black text-white p-4 rounded-3xl hover:bg-red-500 hover:text-black transition-all text-center">Start a drive</Link>
    </div>
  )
}

export default Dashboard