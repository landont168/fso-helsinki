import Diaries from "./components/Diaries";
import axios from "axios";
import { useState, useEffect } from "react";
import { Diary, NewDiary, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from "./services/diariesService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // form data fields
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("great");
  const [weather, setWeather] = useState("sunny");
  const [comment, setComment] = useState("");

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    // create diary but catch possible errors
    createDiary(newDiary)
      .then((diary) => {
        setDiaries(diaries.concat(diary));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMsg(error.response.data);
        }
      });
  };

  // fetch entries from backend
  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <form onSubmit={addDiary}>
        <h2>Add new entry</h2>
        <div style={{ color: "red" }}>{errorMsg}</div>
        <div>
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label>visibility</label>
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          >
            <option value="great">great</option>
            <option value="good">good</option>
            <option value="ok">ok</option>
            <option value="poor">poor</option>
          </select>
        </div>
        <div>
          <label>weather</label>
          <select
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          >
            <option value="sunny">sunny</option>
            <option value="rainy">rainy</option>
            <option value="cloudy">cloudy</option>
            <option value="stormy">stormy</option>
            <option value="windy">windy</option>
          </select>
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
