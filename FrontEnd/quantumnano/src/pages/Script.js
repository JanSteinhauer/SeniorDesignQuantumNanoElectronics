import React, {useState} from 'react';
import styled from 'styled-components';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import FileDropIn from '../component/FildDropIn';
import InputField from '../component/InputField';
import InputFields from '../component/InputFields';
import CodeEditor from '../component/CodeEditor';
import Button from '../component/StyledButton';
import ToggleSwitch from '../component/ToggleSwitch';

import InputFieldsFake from '../component/InputFieldsFake';


const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const Script = () => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [typeVar1_mat, setTypeVar1_mat] = useState();
  const [typeVar2_mat, setTypeVar2_mat] = useState();
  const [typeVar3_mat, setTypeVar3_mat] = useState();
  const [typeVar4_mat, setTypeVar4_mat] = useState("14");
  const [typeVar5_mat, setTypeVar5_mat] = useState("15");
  const [typeVar6_mat, setTypeVar6_mat] = useState("16");
  const [typeVar7_mat, setTypeVar7_mat] = useState("17");
  const [typeVar1_geo, setTypeVar1_geo] = useState();
  const [typeVar2_geo, setTypeVar2_geo] = useState();
  const [typeVar1_run, setTypeVar1_run] = useState();
  const [typeVar2_run, setTypeVar2_run] = useState();


  const initial_export_Code = `
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
  
  # ... (rest of the code can be added here using their respective typeVars)
    `;
    
    const materialjl = `
    function nextsite(iorb::Int)
    return (1 - 2 * iorb)
end

function pushHopping!(NNs::Vector, t, ia::Vector{Int}, ib::Vector{Int}, p::Dict)
    a = xyztoi(p, ia)
    b = xyztoi(p, ib)
    ra = xyztor(p, ia)
    rb = xyztor(p, ib)
    r = rb - ra
    # for hopping term
    NN = deepcopy(Hopping(a, b, ia, ib, ra, rb, r, t, false, [0; 0; 0], ""))
    push!(NNs, NN)
end

function metalHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    t = (3 * p[${typeVar1_mat}] - 1 * eV) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            ib = Int.(ia + di)
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            t = -1 * p["t"] * I(2)
            pushHopping!(NNs, t, ia, ib, p)
            #t = (p.ϵ₁ + 2*p.t)*(I(2))
            #pushHopping!(NNs, t, ia, ia, p)
        end
    end
end

function insHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    t = (p[${typeVar2_mat}] + 3 * p[${typeVar1_mat}]) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            ib = Int.(ia + di)
            t = -1 / 2 * p["t"] * I(2)
            pushHopping!(NNs, t, ia, ib, p)
            #t = (p.ϵ₁ + 2*p.t)*(I(2))
            #pushHopping!(NNs, t, ia, ia, p)
        end
    end
end



function weyl3Hopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    # nearest neighbors
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            #di[5] = nextsite(iorb); 
            ib = Int.(ia + di)
            t = zeros(ComplexF64, 2, 2)
            if (ax == 3)
                t = p["t"] * σ[3]
            elseif (ax == 1)
                t == p["t"] * (-σ[3] .+ dir * 2 * im * σ[1])
            elseif (ax == 2)
                t == p["t"] * (-σ[3] .+ dir * 2 * im * σ[2])
            else
                println("Something broken! No 4th axis")
            end
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    # next nearest neighbors
    for dx = [-1, 1]
        for dy = [-1, 1]
            di = zeros(5)
            di[1] = dx
            di[2] = dy
            ib = Int.(ia + di)
            t = 1.5 * im * p["t"] * (-dx * σ[1] .+ -dy * σ[2]) # implements the next-nearest neigbor term
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    # next-to-next nearest neighbors
    for ax = 1:2
        for dir = [-1, 1]
            di = zeros(5)
            di[ax] = 2 * dir
            ib = Int.(ia + di)
            t = dir * p["t"] * 0.5 * im * σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end


function weyl2Hopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    # nearest neighbors
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            #di[5] = nextsite(iorb); 
            ib = Int.(ia + di)
            t = zeros(ComplexF64, 2, 2)
            if (ax == 1)
                t = p["t"] * (σ[1] .- σ[3])
            elseif (ax == 2)
                t = -p["t"] * (σ[1] .+ σ[3])
            elseif (ax == 3)
                t = p["t"] * σ[3]
            else
                println("Something broken! No 4th axis")
            end
            #t = (-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    for dx = [-1, 1]
        for dy = [-1, 1]
            di = zeros(5)
            di[1] = dx
            di[2] = dy
            ib = Int.(ia + di)
            t = -dx * dy * 0.5 * p["t"] * σ[2] # implements the next-nearest neigbor term
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end

function chern2DHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    #ib[5] += nextsite(iorb)
    #t = 3*p.t*(I(2))
    #pushHopping!(NNs, t, ia, ib , p)
    # for H₂ = τ₃⊗σ₀
    t = nextsite(iorb) * (2 * p["m2"] + p["γ"]) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            # for Hweyl = τ₁⊗k⋅σ
            di[5] = nextsite(iorb)
            ib = Int.(ia + di)
            t = (im / 2) * dir * p["t"] * σ[ax]
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            #t = nextsite(iorb)*(-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
            # for normal hopping term in hamiltonian
            ib[5] = iorb

            t = -(1 / 2) * nextsite(iorb) * p["m2"] * (I(2))
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end


function weylHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    #ib[5] += nextsite(iorb)
    #t = 3*p.t*(I(2))
    #pushHopping!(NNs, t, ia, ib , p)
    # for H₂ = τ₃⊗σ₀
    t = 3 * nextsite(iorb) * p[${typeVar3_mat}] * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            # for Hweyl = τ₁⊗k⋅σ
            di[5] = nextsite(iorb)
            ib = Int.(ia + di)
            t = (-im / 2) * dir * p["t"] * σ[ax]
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            #t = nextsite(iorb)*(-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
            # for normal hopping term in hamiltonian
            ib[5] = iorb

            t = -(1 / 2) * nextsite(iorb) * p["t"] * (I(2))
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end



subspace_sizes = Dict{String,Number}(
    "nx" => 1,
    "ny" => 1,
    "nz" => 1,
    "norb" => 2,
    "nsite" => 1,
    "nspin" => 2
)

site_positions = [[0.0; 0.0; 0.0]] # positions of each site in the unit cell such that position of atom i = Rᵢ = A*site_position[i]

material_hamiltonians = Dict{String,Function}(
    "mtjweyl" => weylHopping,
    "2Dchern" => chern2DHopping,
    "weyl" => weylHopping,
    "weyl2" => weyl2Hopping,
    "weyl3" => weyl3Hopping,
    "wins" => insHopping,
    "ins" => insHopping,
    "insulator" => insHopping,
    "metal" => metalHopping
)



      `;


      const geometry = `
      function devicegeometry(R::Vector{Float64})
	x = R[1]; y = R[2]; z = R[3];
	if (x<10*nm || x>50*nm)
		return "ins"
	else
		return "metal"
	end
end

geometry_params = Dict("A" => 2.866*nm*I(3), # this is the matrix of unit cell lattice vectors
		   "nx" => 50, "ny" => 5, "nz" => 1, # number of times to tile this cell over space in each direction to make whole device
		   "prune" => ["x","y","z"], # by default, system will set up periodic boundary conditions. This clips those hoppings
		   )

        `;

    const runjl = `
    # this is the top level definition of the run parameters


    γ⁵ = 0 # ?? not sure. this can go in constants? # TODO Vivian
    runparams = Dict(
      "path" => OUTPUT_DIR,
      "material_hamiltonian" => material_hamiltonians,
      "material_params" => Dict("t" => 1.0, "ε₀" => 1.0, "site_positions"=>site_positions),
    
      # define the routines to run. The three main ones are unitcell, transport, and supercell. 
      # Comment out a routine to not run it.
    
      # so, for runs looking at the electronic properties of just one unit cell
      "unitcell" => Dict("material"=> "metal", "bands" => true, "bands_project" => [σ[1],γ⁵], "save"=>[:bandstructure, :DOS], "poisson" => false, "DOS" => false),
      
      # and for runs looking at the voltage-dependent transport properties
      "transport" => Dict("geometry" => devicegeometry, "ΔV" => 0.01, "μ" => 0.1*eV, "T" => 300, "η" => 1E-4*eV, "save" => [:transmission, :conductance], "electrodeMagnetization" => false, "Gʳinv_method" => :RGF, "D_spin" => 0.01*eV, "D_momentum" => 0.5*eV, "kspace"=>false, "E_samples" => [E for E = 0.0:0.1:2.0], "electrodeMaterial" => "metal"),
      
      # and for runs where we want to slap a bunch of unit cells together and get the scattering-corrected electronic properties
      "supercell" => Dict("geometry" => devicegeometry, "bands_project" => [σ[1],σ[2]], "poisson"=>true, "μ" => 0.1*eV, "T" => 300, "η" => 1E-4*eV, "save" => [:unfoldedbands], "density_project" => [I(2),[σ[1],σ[2],σ[3]]], "Gʳinv_method" => :RGF, "D_dephasing" => 0.1*eV, "D_spin" => 0.01*eV, "D_momentum" => 0.5*eV)
    )
    
    # all parameters of the simulation must be passed in through the runparams, and now we will ensure they are added
    # or calculated in the beginning. 
    function add_more_params!(runparams)
      # size of the H(k) hamiltonian for one unit cell
      n_unitcell = subspace_sizes["nsite"]*subspace_sizes["norb"]*subspace_sizes["nspin"]
      # size of the H(k) hamiltonian for the entire device
      n_device = geometry_params["nx"]*geometry_params["ny"]*geometry_params["nz"]*subspace_sizes["nsite"]*subspace_sizes["norb"]*subspace_sizes["nspin"]
    
    
      # this is a loop that will add keys to all routines
      for key in ["unitcell", "supercell", "transport"]
        if !haskey(runparams,key)
          continue
        end
        runparams[key]["material_hamiltonian"] = runparams["material_hamiltonian"]
        merge!(runparams[key], subspace_sizes)
        runparams[key]["path"] = runparams["path"]
      end
      
      if haskey(runparams,"unitcell")
        runparams["unitcell"]["n"] = n_unitcell
        merge!(runparams["unitcell"], runparams["material_params"])
      end
    
      if haskey(runparams,"supercell")
        runparams["supercell"]["n"] = n_device
        merge!(runparams["supercell"],geometry_params)
        merge!(runparams["supercell"], runparams["material_params"])
      end
    
      if haskey(runparams,"transport")
        runparams["transport"]["n"] = n_device
        
        # now we will add in the H(k) subspace, and then overwrite the nx, ny, nz with the device geometry
        merge!(runparams["transport"],geometry_params)
        push!(runparams["transport"]["prune"],"x")
        merge!(runparams["transport"], runparams["material_params"])
        runparams["transport"]["G"] = 2*π*inv(runparams["transport"]["A"])
      end
    end
    
    add_more_params!(runparams)
    
    
    # All of these have references in this code and are used.
    # copied this from random, but the code needs these in order to complete run. these need to be moved to a place
    # TODO Vivian
    anotherparamdict = Dict(
        "a₁" => [1.0e-9, 0.0, 0.0],
        "a₂" => [0.0, 1.0e-9, 0.0],
        "a₃" => [0.0, 0.0, 1.0e-9],
      "deviceMaterial" => "metal",
      "deviceMagnetization" => true,
      "ε₁" => 2,
      "fieldtype" => "β",
      "A" => [1 0 0; 0 1 0; 0 0 1],
        "returnvals" => ["transmission"],
        "μ_disorder" => 0.0,
        "SLa₂" => [0.0, 1.0e-9, 0.0],
        "δV" => 0.01,
        "l_scattering" => 0.0,
        "vf" => 1000000,
        "n_BLAS" => 8,
        "γ" => 0,
    )
    merge!(runparams["transport"], anotherparamdict)    
      `;
    const exportToJuliaFileMat = () => {
      const blob = new Blob([materialjl], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'material.jl'; // Naming the download file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }

    const exportToJuliaFileRun = () => {
      const blob = new Blob([runjl], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'run.jl'; // Naming the download file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }

    const exportToJuliaFileGeo = () => {
      const blob = new Blob([geometry], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'geometry.jl'; // Naming the download file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }

    const exportToJuliaFile = () => {
      // console.log("test 1")
      // exportToJuliaFileGeo()
      // exportToJuliaFileMat()
      // exportToJuliaFileRun()
      // console.log("test2")
      createAndDownloadCSV()
    };
    
    const createAndDownloadCSV = () => {
      const filename = 'plot_params.csv';
  
      // Arrays of headers and corresponding values
      const headers = ["Semiconductor", "Metal", "Weyl Semimetal", "Sheet", "Nanowire", "Bandstructure", "Conductance"];
      const values = [typeVar1_mat, typeVar2_mat, typeVar3_mat, typeVar1_geo, typeVar2_geo, typeVar1_run, typeVar2_run];
  
      let csvContent = "data:text/csv;charset=utf-8,";
  
      // Preparing the rows with headers and values
      for (let i = 0; i < headers.length; i++) {
          csvContent += values[i] + "\r\n";
      }
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link); // Required for FF
  
      link.click(); // This will download the CSV file
      document.body.removeChild(link); // Clean up
  };
  

  // In your Script component

const updateVariable = (varName, value) => {
  console.log("updatevar test", varName, value)
  switch(varName) {
    case 'typeVar1_mat':
      setTypeVar1_mat(value);
      break;
    case 'typeVar2_mat':
      setTypeVar2_mat(value);
      break;
    case 'typeVar3_mat':
      setTypeVar3_mat(value);
      break;
    case 'typeVar4_mat':
      setTypeVar4_mat(value);
      break;
    case 'typeVar5_mat':
        setTypeVar5_mat(value);
        break;
    case 'typeVar6_mat':
      setTypeVar6_mat(value);
      break;
    case 'typeVar7_mat':
      setTypeVar7_mat(value);
      break;
    default:
      console.warn(`No handler for ${varName}`);
  }
}


  const handleValuesChange = (index, value) => {
    console.log("index", index, "vql", value)
    switch(index) {
      case 0:
        setTypeVar1_mat(value)
        break;
      case 1: 
        
        setTypeVar2_mat(value);
        break;
      case 2:
        setTypeVar3_mat(value);
        break;
      case 3:
        setTypeVar4_mat(value);
        break;
      case 4:
        setTypeVar5_mat(value);
        break;
      case 5:
        setTypeVar6_mat(value);
        break;
      case 6:
        setTypeVar7_mat(value);
        break;
      default:
        console.warn(`Unhandled field index: ${index}`);
    }
  }
  const handleValuesChangeGeo = (index, value) => {
    console.log("index", index, "vql", value)
    switch(index) {
      case 0:
        setTypeVar1_mat(value)
        break;
      case 1: 
        
        setTypeVar2_mat(value);
        break;
      case 2:
        setTypeVar3_mat(value);
        break;
      case 3:
        setTypeVar4_mat(value);
        break;
      case 4:
        setTypeVar5_mat(value);
        break;
      case 5:
        setTypeVar6_mat(value);
        break;
      case 6:
        setTypeVar7_mat(value);
        break;
      default:
        console.warn(`Unhandled field index: ${index}`);
    }
  }


  return (
    <div className="visualization">
      
      <h1>Input your parameters to get a Julia Script 🧮</h1>
      {/* <FileDropIn values={[setTypeVar1_mat, setTypeVar2_mat, setTypeVar3_mat, setTypeVar1_geo, setTypeVar2_geo, setTypeVar1_run, setTypeVar2_run]}/> */}
      <ToggleSwitchContainer>
        <ToggleSwitch onSwitch={setShowCodeEditor} />
      </ToggleSwitchContainer>
      {showCodeEditor ? (
        <>
          <h2>Code Editor</h2>
          <CodeEditor
            updateVariable={updateVariable} 
            typeVar1_mat={typeVar1_mat} 
            typeVar2_mat={typeVar2_mat} 
            typeVar3_mat={typeVar3_mat} 
            typeVar4_mat={typeVar4_mat} 
            typeVar5_mat={typeVar5_mat} 
            typeVar6_mat={typeVar6_mat} 
            typeVar7_mat={typeVar7_mat} 
            
          />
        </>
      ) : (
        <>

          <InputFields onValuesChange={handleValuesChange} values={[typeVar1_mat, typeVar2_mat, typeVar3_mat, typeVar4_mat, typeVar5_mat, typeVar6_mat, typeVar7_mat]} values_geo={[typeVar1_geo, typeVar2_geo, setTypeVar1_geo, setTypeVar2_geo]} values_run={[typeVar1_run, typeVar2_run, setTypeVar1_run, setTypeVar2_run]} />
 
        </>
      )}
        {!showCodeEditor ? (
          <>
           <Button heading={"Start Export"} onClick={exportToJuliaFile} />
          </>): (<></>)}
  
 
    </div>


  );
};

export default Script;