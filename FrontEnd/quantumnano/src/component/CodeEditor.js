import React, { useState, useEffect } from 'react';

const CodeEditor = ({ typeVar1, typeVar2, typeVar3, typeVar4, typeVar5, typeVar6 }) => {
  const initialCode = `
@cfunction(callable, ReturnType, (ArgumentTypes...,)) -> Ptr{Cvoid}
@cfunction($callable, ReturnType, (ArgumentTypes...,)) -> CFunction
julia> A = zeros(5, 5);
julia> B = [1 2; 3 4];

# Function for material parameters
function material_parameters(
        mat_param1::${typeVar1}, 
        mat_param2::${typeVar2}, 
        mat_param3::${typeVar3}, 
        mat_param4::${typeVar4}, 
        mat_param5::${typeVar5}, 
        mat_param6::${typeVar6})
    return (mat_param1, mat_param2, mat_param3, mat_param4, mat_param5, mat_param6)
end

# ... (rest of the code can be added here using their respective typeVars)
  `;

  const [code, setCode] = useState(initialCode);
  const [lines, setLines] = useState(computeLines(initialCode));

  function computeLines(text) {
    return text.split('\n').length;
  }

  useEffect(() => {
    setLines(computeLines(code));
  }, [code]);

  useEffect(() => {
    setCode(initialCode); // Refresh the code whenever any typeVar changes
  }, [typeVar1, typeVar2, typeVar3, typeVar4, typeVar5, typeVar6]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '20px' }}>
     
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          height: `${lines * 21}px`,
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          resize: 'none'
        }}
      />
    </div>
  );
}

export default CodeEditor;
