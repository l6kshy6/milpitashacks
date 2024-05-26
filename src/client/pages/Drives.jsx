import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import MapComponent from "../components/MapComponent";
import { APIProvider } from "@vis.gl/react-google-maps";

const Drives = () => {
    const [drives, setDrives] = useState([]);
    const [location, setLocation] = useState(null);

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
    const focusHandler = (location)=>{
        console.log(location.lat+" "+location.lng);
        setLocation(location);
    };

    return (
        <div className="w-full h-full flex">
            <div  className="w-1/3 h-full bg-white p-5 flex flex-col gap-5 ">
                <div className="text-xl">Drives near you</div>
                {drives.map(drive => <div onClick={()=>focusHandler(drive.location)} className="border p-5 rounded-2xl flex flex-col gap-2 cursor-pointer" key={drive.id}>
                    <div className="overflow-hidden truncate text-sm font-bold">{drive.name}</div>
                    <div className="italic text-xs text-gray-500">{drive.location.address}</div>
                    {drive.goals.map((goal, i) => <div className="text-xs flex items-center justify-between" key={i}>
                        <div className="">{goal.resource}</div>
                        <div className="font-bold">0 of {goal.amount} raised</div>
                    </div>)}
                </div>)}
            </div>
            <div className="w-full">
                <MapComponent drives={drives} focusHandler={focusHandler} location={location}/>
            </div>
        </div>
    )
}

export default Drives;