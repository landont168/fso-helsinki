import { Diary } from "../types";
const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
