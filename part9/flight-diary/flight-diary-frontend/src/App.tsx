import Diaries from "./components/Diaries";
import { useState, useEffect } from "react";
import { Diary, NewDiary, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from "./services/diariesService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  // form data fields
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };
    createDiary(newDiary).then((diary) => {
      setDiaries(diaries.concat(diary));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
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
        <div>
          <label>date</label>
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label>visibility</label>
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          <label>weather</label>
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
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
