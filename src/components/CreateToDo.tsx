import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IForm, IToDo, toDoState } from "../Atoms";

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((oldToDos) => [
      ...oldToDos,
      {
        text: data.toDo,
        id: Date.now(),
        category,
      },
    ]); // 원래 있던 배열을 mutate 하는게 아닌 새로운 array를 반환 하기 위해 {}<IToDo>로 갖춰진 값을 반환
    setValue("toDo", ""); // register에 등록된 toDo input 을 비어있는 "" 로 set
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "Please write a ToDo",
        })}
        placeholder="Write ToDo"
      />
      <button>Write</button>
    </form>
  );
}

export default CreateToDo;
