import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./Atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
    // input의 값은 기본적으로 string로 들어오기 때문에 +를 사용해 하나만 들어오게 함
  };

  const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHourChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
