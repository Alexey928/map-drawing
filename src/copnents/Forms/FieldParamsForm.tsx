import React from 'react';
import {useForm, Controller, SubmitHandler, SubmitErrorHandler} from "react-hook-form";

interface FieldParamsFormType {
    name: string,
    sqere: number,
    collor: string,
}

const FieldParamsForm = () => {
    const {handleSubmit, control} = useForm<FieldParamsFormType>();
    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data);
    };
    const onError: SubmitErrorHandler<FieldParamsFormType> | undefined = (data) => {
        console.log("error", data)
    };


    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}
              action="">
           <span>
               <Controller
                   name="collor" // имя поля
                   control={control} // передаем control из useForm
                   defaultValue="" // значение по умолчанию
                   render={({field}) => (
                       <span>
              Цвет поля -{' '}
                           <input
                               style={{width: 35, borderRadius: 10}}
                               type="color"
                               {...field}
                           />
                        </span>
                   )}
               />


               <span>
                  Название -{' '}
                   <Controller
                       name="name"
                       control={control}
                       defaultValue=""
                       render={({field}) => <input type="text" {...field} />} // передаем пропсы в input
                   />
                </span>
               </span>

            <button type="submit">Отправить</button>
        </form>

    );
};

export default FieldParamsForm;