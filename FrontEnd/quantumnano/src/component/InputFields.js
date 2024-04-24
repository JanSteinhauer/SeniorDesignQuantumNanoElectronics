// InputFields.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import DropDown from './DropDown';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const Header = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 2.0em; /* Adjust the font size as needed */
`;

const InputFields = ({ values, onValuesChange, values_geo, values_run }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValuesMaterial, setInputValuesMaterial] = useState(Array(3).fill()); // Material fields:
  const [inputValuesGeometry, setInputValuesGeometry] = useState(Array(2).fill()); // Geometry fields:
  const [inputValuesRuns, setInputValuesRuns] = useState(Array(2).fill()); // Runs fields:

  useEffect(() => {
    setInputValuesMaterial([values[0], values[1], values[2]]);
    setInputValuesGeometry([values_geo[0], values_geo[1]]);
    setInputValuesRuns([values_run[0], values_run[1]]);
  }, []);
  

  // const handleValueChange = (index, value, section) => {
  //   switch (section) {
  //     case 'Material':
  //       const updatedValuesMaterial = [...inputValuesMaterial];
  //       updatedValuesMaterial[index] = value;
  //       setInputValuesMaterial(updatedValuesMaterial);
  //       break;
  //     case 'Geometry':
  //       const updatedValuesGeometry = [...inputValuesGeometry];
  //       updatedValuesGeometry[index] = value;
  //       setInputValuesGeometry(updatedValuesGeometry);
  //       break;
  //     case 'Runs':
  //       const updatedValuesRuns = [...inputValuesRuns];
  //       updatedValuesRuns[index] = value;
  //       setInputValuesRuns(updatedValuesRuns);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const handleValueChange = (index, value, section) => {
    const sectionIndexOffset = {
      'Material': 0,
      'Geometry': 7,
      'Runs': 14
    };

    // Calculate global index considering section
    const globalIndex = index + sectionIndexOffset[section];
    onValuesChange(globalIndex, value);
  };

  const geochange = (index, value) => {
    if (index == 0){
      values_geo[2](value)
    } else {
      values_geo[3](value)
    }
  }


  const runchange = (index, value) => {
    if (index == 0){
      values_run[2](value)
    } else {
      values_run[3](value)
    }
  }



  const setValuesBasedOnOption = () => {
    switch (selectedOption?.value) {
      case 'defaults':
        setInputValuesMaterial(["", "", ""]);
        setInputValuesGeometry(["", ""]);
        setInputValuesRuns(["", ""]);
        break;
      case 'Graphene':
        setInputValuesMaterial([1, 1, 0]);
        setInputValuesGeometry([0, 0]);
        setInputValuesRuns([1, 4]);
        break;
    }
  };


  useEffect(() => {
    setValuesBasedOnOption();
  }, [selectedOption]);

  const inputFieldPropertiesMaterial = [
    { name: 'material_field_1_hopping', labelText: 'Semiconductor', inputPlaceholder: 'Enter value', helpText: 'Help text for Semiconducto' },
    { name: 'material_field_2_metal', labelText: 'Metal', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - metal' },
    { name: 'material_field_3_insulator', labelText: 'Weyl Semimetal', inputPlaceholder: 'Enter value', helpText: 'Help text for Weyl Semimetalr' },
    { name: 'material_field_4_weyl1', labelText: 'Weyl1', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl1' },
    { name: 'material_field_5_weyl2', labelText: 'Weyl2', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl2' },
    { name: 'material_field_6_weyl3', labelText: 'Weyl3', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl3' },

  ];

  const inputFieldPropertiesGeometry = [
    { name: 'geometry_field_1_position_coordinates', labelText: 'Sheet', inputPlaceholder: 'Enter value', helpText: '' },
    { name: 'geometry_field_2_material_type', labelText: 'Nanowire', inputPlaceholder: 'Enter value', helpText: '' },
    { name: 'geometry_field_3_A', labelText: 'A', inputPlaceholder: 'Enter value', helpText: 'Matrix of unit cell lattice vectors.' },
    { name: 'geometry_field_4_nx', labelText: 'nx', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the x-direction' },
    { name: 'geometry_field_5_ny', labelText: 'ny', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the y-direction' },
    { name: 'geometry_field_6_nz', labelText: 'nz', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the z-direction' },
    { name: 'geometry_field_7_prune', labelText: 'Prune', inputPlaceholder: 'Enter value', helpText: 'List of dimensions to prune' },
  ];

  const inputFieldPropertiesRuns = [
    { name: 'runs_field_1_band', labelText: 'Bandstructure', inputPlaceholder: 'Enter value', helpText: '' },
    { name: 'runs_field_2_bands_project', labelText: 'Conducentance', inputPlaceholder: 'Enter value', helpText: '' },
    { name: 'runs_field_3_possion', labelText: 'Possion', inputPlaceholder: 'Enter value', helpText: 'Boolean indicating whether to include Poisson solver' },
    { name: 'runs_field_4_DOS', labelText: 'DOS', inputPlaceholder: 'Enter value', helpText: 'Boolean indicating whether to compute density of state' },
    { name: 'runs_field_5_v', labelText: 'ΔV', inputPlaceholder: 'Enter value', helpText: 'Voltage bias' },
    { name: 'runs_field_6_u', labelText: 'μ', inputPlaceholder: 'Enter value', helpText: 'Chemical potential' },
    { name: 'runs_field_7_t', labelText: 'T', inputPlaceholder: 'Enter value', helpText: 'Temperature' },
    { name: 'runs_field_8_n', labelText: 'η', inputPlaceholder: 'Enter value', helpText: 'Broadening parameter for densities' },
    { name: 'runs_field_9_savedensities', labelText: 'Save Densities', inputPlaceholder: 'Enter value', helpText: 'Boolean indicating whether to save density matrices' },
    { name: 'runs_field_10_density_project', labelText: 'Density Project', inputPlaceholder: 'Enter value', helpText: 'List of projection operators for density matrices' },
    { name: 'runs_field_11_gGʳinv_method', labelText: 'Gʳinv_method', inputPlaceholder: 'Enter value', helpText: 'Method for computing Greens function inverse' },
    { name: 'runs_field_12_D_dephasing', labelText: 'D_dephasing', inputPlaceholder: 'Enter value', helpText: 'Dephasing parameter' },
    { name: 'runs_field_13_D_spin', labelText: 'D_spin', inputPlaceholder: 'Enter value', helpText: 'Spin relaxation parameter' },
    { name: 'runs_field_14_D_momentum', labelText: 'D_momentum', inputPlaceholder: 'Enter value', helpText: 'Momentum relaxation parameter' },
    { name: 'runs_field_15_kspace', labelText: 'Kspace', inputPlaceholder: 'Enter value', helpText: 'Boolean indicating whether to use k-space' },
  ];

  return (
    <Container>
      <Header>
        {selectedOption
          ? `Input Parameters for ${selectedOption.label}`
          : 'Select an option to set input parameters'}
      </Header>
      <DropDown
        options={[
          { value: 'defaults', label: 'Defaults' },
          { value: 'Graphene', label: 'Graphene' },
        ]}
        selectedOption={selectedOption}
        onSelect={handleDropdownSelect}
      />
      <RowContainer>
          <React.Fragment>
            <Header>Material</Header>
            {inputValuesMaterial.map((value, index) => (
              <React.Fragment key={index}>
                <InputField
                  key={index}
                  name={inputFieldPropertiesMaterial[index].name}
                  labelText={inputFieldPropertiesMaterial[index].labelText}
                  inputPlaceholder={inputFieldPropertiesMaterial[index].inputPlaceholder}
                  helpText={inputFieldPropertiesMaterial[index].helpText}
                  showAsterisk={true}
                  value={value}
                  onValueChange={(newValue) =>{
                    console.log("values", index, "test", newValue)
                    handleValueChange(index, newValue, 'Material')}
                  }
                  min={0}
                  max={3000}
                />
              </React.Fragment>
            ))}
            <br />
            <Header>Geometry</Header>
            {inputValuesGeometry.map((value, index) => (
              <React.Fragment key={index}>
                <InputField
                  key={index}
                  name={inputFieldPropertiesGeometry[index].name}
                  labelText={inputFieldPropertiesGeometry[index].labelText}
                  inputPlaceholder={inputFieldPropertiesGeometry[index].inputPlaceholder}
                  helpText={inputFieldPropertiesGeometry[index].helpText}
                  showAsterisk={true}
                  value={value}
                  onValueChange={(newValue) =>
                    geochange(index, newValue)
                  }
                  min={0}
                  max={300}
                />
              </React.Fragment>
            ))}
            <br />
            <Header>Runs</Header>
            {inputValuesRuns.map((value, index) => (
              <React.Fragment key={index}>
                <InputField
                  key={index}
                  name={inputFieldPropertiesRuns[index].name}
                  labelText={inputFieldPropertiesRuns[index].labelText}
                  inputPlaceholder={inputFieldPropertiesRuns[index].inputPlaceholder}
                  helpText={inputFieldPropertiesRuns[index].helpText}
                  showAsterisk={true}
                  value={value}
                  onValueChange={(newValue) =>
                    runchange(index, newValue)
                  }
                  min={0}
                  max={100}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
      </RowContainer>
    </Container>
  );
};

export default InputFields;
