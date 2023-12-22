import {useState} from "react";
import {CultureTaskType, CultureType, FieldType, SoilTasksTypes} from "../../App";
import {v4 as uuidv4} from 'uuid';


export const useFields = () => {
    const [agroFields, setAgroFields] = useState<Array<FieldType>>([]);
    //"id" is key from FieldType, in this state
    const [fieldTasks, setFieldTasks] = useState<SoilTasksTypes>({
        "id": {
            SOIL_GROUP: [],
            FERTILIZATION_GROUP: [],
        }
    });
    const [cultureTasks, setCultureTasks] = useState<CultureTaskType>({
        "id": {
            MOWING_THE_CROP: [],
            SPRAYING_GROUP: [],
        }
    });
    const [fieldCultures , setFieldCulture] = useState<CultureType>({"id":[]})
    const [thoisedFieldID, setThoisedFieldID] = useState<string>();

    const setNewField = (trajectory: number[][]) => {
        const tempID = uuidv4()
        setAgroFields([...agroFields, {id: tempID, name: null, sqere: null, trajectory}]);
        setThoisedFieldID(tempID);
    }
    const deleteField = (FieldID:string) => {
        setAgroFields(agroFields.filter((el)=>el.id!==FieldID));
    }
    const setFieldParams = (id: string, name: string, sqere: number) => {
        console.log(name,sqere)
        setAgroFields(agroFields.map((el) => el.id === id ? {...el, name,sqere} : el));
    }
    const setCulture = (FieldID:string,name:string,sqere:number,collor:string)=>{
        setFieldCulture({...fieldCultures,[FieldID]:[{id:uuidv4(),name,sqere,collor},...fieldCultures[FieldID]]});
    }
    const removeCulture =(FieldID:string,cultureID:string)=>{
        setFieldCulture({...fieldCultures,[FieldID]:fieldCultures[FieldID].filter((el) => el.id !== cultureID)})
    }
    return {
        agroFields,
        thoisedFieldID,
        fieldTasks,
        cultureTasks,
        fieldCultures,
        setThoisedFieldID,
        setNewField,
        setFieldParams,
        setCulture,
        removeCulture,
        deleteField,
    }
}