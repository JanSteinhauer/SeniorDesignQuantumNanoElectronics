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

const InputFields = (values) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValuesMaterial, setInputValuesMaterial] = useState(Array(7).fill()); // Material fields:
  const [inputValuesGeometry, setInputValuesGeometry] = useState(Array(7).fill()); // Geometry fields:
  const [inputValuesRuns, setInputValuesRuns] = useState(Array(15).fill()); // Runs fields:

  useEffect(() => {
    setInputValuesMaterial([values.values[0], values.values[1], values.values[2], values.values[3], values.values[4], values.values[5], values.values[6]]);
  }, []);
  

  const handleValueChange = (index, value, section) => {
    switch (section) {
      case 'Material':
        const updatedValuesMaterial = [...inputValuesMaterial];
        updatedValuesMaterial[index] = value;
        setInputValuesMaterial(updatedValuesMaterial);
        break;
      case 'Geometry':
        const updatedValuesGeometry = [...inputValuesGeometry];
        updatedValuesGeometry[index] = value;
        setInputValuesGeometry(updatedValuesGeometry);
        break;
      case 'Runs':
        const updatedValuesRuns = [...inputValuesRuns];
        updatedValuesRuns[index] = value;
        setInputValuesRuns(updatedValuesRuns);
        break;
      default:
        break;
    }
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const setValuesBasedOnOption = () => {
    switch (selectedOption?.value) {
      case 'defaults':
        setInputValuesMaterial(Array(7).fill());
        setInputValuesGeometry(Array(7).fill());
        setInputValuesRuns(Array(15).fill());
        break;
      case 'Graphene':
        setInputValuesMaterial([1, 1, 0, 0, 0, 0, 0]);
        setInputValuesGeometry([0, 0, 2, 0, 0, 1, 4]);
        setInputValuesRuns([1, 4, 0, 1, 0, 0, 0, 0, 1, 4, 0, 0, 1, 0, 1]);
        break;
    }
  };


  useEffect(() => {
    setValuesBasedOnOption();
  }, [selectedOption]);

  const inputFieldPropertiesMaterial = [
    { name: 'material_field_1_hopping', labelText: 'Hopping', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - hopping' },
    { name: 'material_field_2_metal', labelText: 'Metal', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - metal' },
    { name: 'material_field_3_insulator', labelText: 'Insulator', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - insulator' },
    { name: 'material_field_4_weyl1', labelText: 'Weyl1', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl1' },
    { name: 'material_field_5_weyl2', labelText: 'Weyl2', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl2' },
    { name: 'material_field_6_weyl3', labelText: 'Weyl3', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - weyl3' },
    { name: 'material_field_7_chern_2d', labelText: 'Chern 2D', inputPlaceholder: 'Enter value', helpText: 'Help text for Material - chern 2d' },
  ];

  const inputFieldPropertiesGeometry = [
    { name: 'geometry_field_1_position_coordinates', labelText: 'Position Coordinates', inputPlaceholder: 'Enter value', helpText: 'Define the position coordinates using a Vector{Float64}' },
    { name: 'geometry_field_2_material_type', labelText: 'Material Type', inputPlaceholder: 'Enter value', helpText: 'Help text for Geometry - Material Type' },
    { name: 'geometry_field_3_A', labelText: 'A', inputPlaceholder: 'Enter value', helpText: 'Matrix of unit cell lattice vectors.' },
    { name: 'geometry_field_4_nx', labelText: 'nx', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the x-direction' },
    { name: 'geometry_field_5_ny', labelText: 'ny', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the y-direction' },
    { name: 'geometry_field_6_nz', labelText: 'nz', inputPlaceholder: 'Enter value', helpText: 'Number of times to tile the cell over space in the z-direction' },
    { name: 'geometry_field_7_prune', labelText: 'Prune', inputPlaceholder: 'Enter value', helpText: 'List of dimensions to prune' },
  ];

  const inputFieldPropertiesRuns = [
    { name: 'runs_field_1_band', labelText: 'Band', inputPlaceholder: 'Enter value', helpText: ' Boolean indicating whether to compute electronic band structure' },
    { name: 'runs_field_2_bands_project', labelText: 'Bands Project', inputPlaceholder: 'Enter value', helpText: 'List of projection operators for computing bands' },
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
      <button onClick={() =>{console.log(inputValuesMaterial, values.values[0])}}>test</button>
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
                  onValueChange={(newValue) =>
                    handleValueChange(index, newValue, 'Material')
                  }
                  min={0}
                  max={1}
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
                    handleValueChange(index, newValue, 'Geometry')
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
                    handleValueChange(index, newValue, 'Runs')
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

