import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
} //React Hook Form은 TypeScript로 빌드되었으며, FormData 유형을 정의하여 form 값을 지원할 수 있다

function ToDoList() {
  /**
   * register로 등록, watch로 구독, handleSubmit으로 요구조건 충족하는지 체크
   */
  const {
    register,
    /*watch,*/ handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@gmail.com", // 초기값도 정해 줄 수 있음
    },
  });
  /*
    console.log(watch());
    => watch 함수로 구독한 정보 가져올 수 있음
*/

  /**
   * 유효성 검사(handelSubmit) 후 만족 시 실행
   */
  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "password is not same." },
        { shouldFocus: true } // error 발생시 cursor 이동
      );
    }

    // setError("extraError", { message: "Server downed." });
  };

  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* {...}로 풀어쓰기 하여 props 등록 */}
        <input
          {...register("email", {
            required: "E-mail is required",

            pattern: {
              value: /^[A-Za-z0-9]+@+[A-Za-z0-9]+\.+[A-Za-z0-9]/,
              message: "plz input email form",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            validate: (value) =>
              value.includes("lee") ? "illigal name" : true,
          })} // 유효성 직접 부여 하기
          placeholder="first name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", {
            validate: {
              noLee: (value) => (value.includes("lee") ? "illigal name" : true),
              noJ: (value) => (value.includes("J") ? "illigal name" : true), // 직접 validate 함수 구현 가능
            },
          })}
          placeholder="last name"
        />
        <span>{errors?.lastName?.message}</span>

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
        <span>{errors?.password?.message}</span>

        <input {...register("passwordCheck")} placeholder="password check" />
        <span>{errors?.passwordCheck?.message}</span>

        <button>submit</button>
      </form>
    </div>
  );
}

export default ToDoList;
