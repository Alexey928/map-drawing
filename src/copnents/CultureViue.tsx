import React from 'react';
type CultureViueType = {
    id:string
    color:string
    name:string,
    sqere:string,
    varietyOfCultureName:string
}

const CultureViue:React.FC<CultureViueType> = ({name,sqere,varietyOfCultureName}) => {
    return (
        <div>
            {`${name} ( ${varietyOfCultureName} )     -     ${sqere}`};
        </div>
    );
};

export default CultureViue;