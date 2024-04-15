  import React, { useState, useEffect } from 'react';

  const CodeEditor = ({ updateVariable, typeVar1_mat, typeVar2_mat, typeVar3_mat, typeVar4_mat, typeVar5_mat, typeVar6_mat, typeVar7_mat,
                        typeVar1_geo, typeVar2_geo, typeVar3_geo, typeVar4_geo, typeVar5_geo, typeVar6_geo, typeVar7_geo, 
                        typeVar1_run, typeVar2_run, typeVar3_run, typeVar4_run, typeVar5_run, typeVar6_run, typeVar7_run,
                        typeVar8_run, typeVar9_run, typeVar10_run, typeVar11_run, typeVar12_run, typeVar13_run, typeVar14_run,
                        typeVar15_run}) => {
    const initialCode = `
  @cfunction(callable, ReturnType, (ArgumentTypes...,)) -> Ptr{Cvoid}
  @cfunction($callable, ReturnType, (ArgumentTypes...,)) -> CFunction
  julia> A = zeros(5, 5);
  julia> B = [1 2; 3 4];

  # Function for material parameters
  function material_parameters(
          mat_param1::${typeVar1_mat}, 
          mat_param2::${typeVar2_mat}, 
          mat_param3::${typeVar3_mat}, 
          mat_param4::${typeVar4_mat}, 
          mat_param5::${typeVar5_mat}, 
          mat_param6::${typeVar6_mat},
          mat_param7::${typeVar7_mat})
      return (mat_param1, mat_param2, mat_param3, mat_param4, mat_param5, mat_param6, mat_param7)
  end

  function geometry_parameters(
          geo_param1::${typeVar1_geo}, 
          geo_param2::${typeVar2_geo}, 
          geo_param3::${typeVar3_geo}, 
          geo_param4::${typeVar4_geo}, 
          geo_param5::${typeVar5_geo}, 
          geo_param6::${typeVar6_geo},
          geo_param7::${typeVar7_geo})
      return (geo_param1, geo_param2, geo_param3, geo_param4, geo_param5, geo_param6, geo_param7)
  end

  function run_parameters(
          run_param1::${typeVar1_run}, 
          run_param2::${typeVar2_run}, 
          run_param3::${typeVar3_run},
          run_param4::${typeVar4_run}, 
          run_param5::${typeVar5_run}, 
          run_param6::${typeVar6_run},
          run_param7::${typeVar7_run},
          run_param8::${typeVar8_run},
          run_param9::${typeVar9_run},
          run_param10::${typeVar10_run},
          run_param11::${typeVar11_run},
          run_param12::${typeVar12_run},
          run_param13::${typeVar13_run},
          run_param14::${typeVar14_run},
          run_param15::${typeVar15_run})
      return (run_param1, run_param2, run_param3, run_param4, run_param5, run_param6, run_param7, run_param8, run_param9, run_param10, run_param11, run_param12, run_param13, run_param14, run_param15)
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
      setCode(initialCode);
    }, [initialCode]);
  
    const handleCodeChange = (event) => {
      const newCode = event.target.value;
      setCode(newCode); 
  
      // Regex to capture 'mat_paramX::value'
      const regex = /mat_param(\d+)::(\d+)/g;
      let match;
      console.log("match", match)
      while ((match = regex.exec(newCode)) !== null) {
        const varName = `typeVar${match[1]}_mat`;
        const value = match[2];
        console.log(`${varName} is changed to ${value}`);
        updateVariable(varName, value);
      }
    };
  

    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '20px' }}>
      
        
        <textarea
          value={code}
          onChange={handleCodeChange}
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
