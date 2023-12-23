import React from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";

interface FieldParamsFormType {
    name: string,
    sqere: number,

}
type fieldParamsFormType = {
    setFieldParams: ( name: string, squere: number)=>void

}

const FieldParamsForm:React.FC<fieldParamsFormType> = ({setFieldParams}) => {
    const {handleSubmit, control, register} = useForm<FieldParamsFormType>({
        defaultValues:{
        }});

    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data);
        setFieldParams(data.name,data.sqere);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              action="">
           <span>
               <span>
                   Площадь - {" "}
                   <Controller
                       name="sqere"
                       control={control}
                       render={({field}) =>
                           <input style={{width: 50}}
                                  {...field}
                                  type="number"
                                  step={2}
                                  {...(register("sqere"), {required: true})}
                           />} // передаем пропсы в input
                   />
               </span>
                   <span>
                      Название -{' '}
                       <Controller
                           name="name"
                           control={control}
                           render={({field}) =>
                               <input
                                   {...field}
                                   type="text"
                                   {...(register("name"), {required: true,})}
                               />
                            }
                       />
                    </span>
           </span>

            <button>OK</button>
        </form>

    );
};

export default FieldParamsForm;