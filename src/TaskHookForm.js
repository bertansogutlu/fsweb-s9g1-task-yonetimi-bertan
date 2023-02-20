import React from 'react'
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"});
  
  console.log(errors)
  const onSubmit = (data) => { console.log(data) };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength:{
              value: 4,
              message: "Task başlığı en az 3 karakter olmalı"
            }
            })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength:{
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı"
            }
            })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: {
                    max: v => v.length < 3 || "En fazla 3 kişi seçebilirsiniz"
                  }
                  })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

