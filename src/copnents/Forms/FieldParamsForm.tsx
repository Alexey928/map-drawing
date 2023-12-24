import React from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";

interface FieldParamsFormType {
    name: string,
    sqere: number,

}
type fieldParamsFormType = {
    setFieldParams: ( name: string, squere: number)=>void
    name:string,
    sqere:number,

}
const FieldParamsForm:React.FC<fieldParamsFormType> = ({setFieldParams,name,sqere}) => {
    const {handleSubmit, control, register, reset} = useForm<FieldParamsFormType>({defaultValues: {
        name: name,
        sqere: sqere,}}
    );

    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data,control);
        setFieldParams(data.name,data.sqere);
        reset({
            name: '',
            sqere: 0,
        })
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