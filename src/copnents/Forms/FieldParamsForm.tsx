import React from 'react';
import {useForm, Controller, SubmitHandler, SubmitErrorHandler} from "react-hook-form";

interface FieldParamsFormType {
    name: string,
    sqere: number,
    collor: string,
}

const FieldParamsForm = () => {
    const {handleSubmit, control,register} = useForm<FieldParamsFormType>();

    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data,control);
    };
    const onError: SubmitErrorHandler<FieldParamsFormType> | undefined = (data) => {
        console.log("error", data);
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
                       <span> Цвет поля -{' '}
                           <input
                               {...(register("collor"),{ required:true })}
                               style={{width: 35, borderRadius: 10}}
                               type="color"
                           />
                       </span>
                   )}
              />
               <span>
                   Площадь - {" "}
                   <Controller
                       name="sqere"
                       control={control}
                       defaultValue = {0}
                       render={({field}) =>
                           <input style={{width:50}}
                                  type="number" step={5}
                                  {...(register("sqere"),{ required:true })}
                           />} // передаем пропсы в input
                   />
               </span>
                   <span>
                      Название -{' '}
                       <Controller
                           name="name"
                           control={control}
                           defaultValue=""
                           render={({field}) => <input type="text" {...(register("collor"),{ required:true })} />} // передаем пропсы в input
                       />
                    </span>
           </span>

            <button >Отправить</button>
        </form>

    );
};

export default FieldParamsForm;