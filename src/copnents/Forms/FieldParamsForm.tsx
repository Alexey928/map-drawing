import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {RegularEditableSpan} from "../../uiComponents/RgularEditinebalSpan/RegularEditableSpan";

interface FieldParamsFormType {
    name: string,
    sqere: string,

}
type fieldParamsFormType = {
    setFieldParams: ( name: string, squere: number)=>void
    name:string,
    sqere:string,
}
const FieldParamsForm:React.FC<fieldParamsFormType> = ({setFieldParams,name,sqere}) => {
    const[plaseholder,setPlaseholder] = useState({sqere:"Введите S ",name:"Введите название"})
    const {handleSubmit, control, reset} = useForm<FieldParamsFormType>();

    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data);
        setFieldParams(data.name, +data.sqere);
        reset({
            name:"",
            sqere:"",
        })

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              action="">
           <span>
               <span>
                   Площадь - Га{" "}
                   <Controller
                       rules={{required:true}}
                       name="sqere"
                       control={control}
                       render={({field:{onChange}}) =>
                           <RegularEditableSpan
                               placeholder={plaseholder.sqere}
                               type={"number"}
                               onChange={(newValue)=>{
                                   onChange(newValue);
                                   setPlaseholder({...plaseholder,sqere: newValue})
                               }}
                           />}
                   />
               </span>
                  <br/>
                   <span>
                      Название / Абривиотура{' '}

                       <Controller
                           rules={{required:true}}
                           name="name"
                           control={control}
                           render={({field:{onChange},fieldState:{error}}) =>
                               <RegularEditableSpan
                                   placeholder={plaseholder.name}
                                   lang={"ru"}
                                   type={"text"}
                                   onChange={(newValue)=>{
                                       console.log(error)
                                       onChange(newValue);
                                       setPlaseholder({...plaseholder,name: newValue})
                                   }}
                               />
                            }
                       />
                    </span>
           </span>

            <button type={"submit"}>OK</button>
        </form>

    );
};

export default FieldParamsForm;