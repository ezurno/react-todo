import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  /**
   * register로 등록, watch로 구독, handleSubmit으로 요구조건 충족하는지 체크
   */
  const { register, /*watch,*/ handleSubmit, formState } = useForm();
  /*
    console.log(watch());
    => watch 함수로 구독한 정보 가져올 수 있음
*/

  /**
   * 유효성 검사(handelSubmit) 후 만족 시 실행
   */
  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        {/* {...}로 풀어쓰기 하여 props 등록 */}
        <input
          {...register("Email", { required: true, minLength: 5 })}
          placeholder="e-mail"
        />
        <input {...register("firstName")} placeholder="first name" />
        <input {...register("lastName")} placeholder="last name" />
        <input {...register("userName")} placeholder="user name" />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="password"
        />
        <input {...register("passwordCheck")} placeholder="password check" />

        <button>submit</button>
      </form>
    </div>
  );
}

export default ToDoList;
