import React, { useState, useEffect } from 'react';

const CodeEditor = () => {
    const initialCode = `
@cfunction(callable, ReturnType, (ArgumentTypes...,)) -> Ptr{Cvoid}
@cfunction($callable, ReturnType, (ArgumentTypes...,)) -> CFunction
julia> A = zeros(5, 5);

julia> B = [1 2; 3 4];

# Function for material parameters
function material_parameters(
        mat_param1::Float64, 
        mat_param2::Float64, 
        mat_param3::Float64, 
        mat_param4::Float64, 
        mat_param5::Float64, 
        mat_param6::Float64)
    return (mat_param1, mat_param2, mat_param3, mat_param4, mat_param5, mat_param6)
end

# Function for geometry parameters
function geometry_parameters(
        geom_param1::Float64, 
        geom_param2::Float64, 
        geom_param3::Float64, 
        geom_param4::Float64, 
        geom_param5::Float64, 
        geom_param6::Float64)
    return (geom_param1, geom_param2, geom_param3, geom_param4, geom_param5, geom_param6)
end

# Function for run parameters
function run_parameters(
        run_param1::Float64, 
        run_param2::Float64, 
        run_param3::Float64, 
        run_param4::Float64, 
        run_param5::Float64, 
        run_param6::Float64)
    return (run_param1, run_param2, run_param3, run_param4, run_param5, run_param6)
end
`;
const [code, setCode] = useState(initialCode);
const [lines, setLines] = useState(computeLines(initialCode));

function computeLines(text) {
  return text.split('\n').length;
}

useEffect(() => {
  setLines(computeLines(code));
}, [code]);

return (
  <div style={{ display: 'flex', backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '20px' }}>
    {/* <div style={{ marginRight: '8px' }}>
      {[...Array(lines)].map((_, idx) => (
        <div key={idx} style={{ fontFamily: 'monospace', fontSize: '14px', padding: '8.5px 0' }}>{idx + 1}</div>
      ))}
    </div> */}
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
